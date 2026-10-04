import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { repository } from './policy.mjs';
const sha = 'a'.repeat(40);
const pr = {
	number: 7,
	state: 'open',
	draft: true,
	head: { sha, repo: { full_name: repository } },
	base: { repo: { full_name: repository } },
};
const jobs = ['commitlint', 'format-and-lint', 'types', 'unit'].map((name) => ({
	name,
	status: 'completed',
	conclusion: 'success',
}));
const run = { id: 9, head_sha: sha, head_repository: { full_name: repository }, pull_requests: [{ number: 7 }] };
async function authorize(event, remote = pr, latestJobs = jobs, sourceVersion = 2) {
	const root = await mkdtemp(join(tmpdir(), 'capsule-authorize-'));
	try {
		await writeFile(join(root, 'event.json'), JSON.stringify(event));
		await writeFile(
			join(root, 'services.mjs'),
			`let prReads=0;const remotes=${JSON.stringify(Array.isArray(remote) ? remote : [remote])};globalThis.fetch=async url=>{const p=new URL(url).pathname; if(p.endsWith('/contents/tools/deployment/policy.mjs')) return Response.json({encoding:'base64',content:'${Buffer.from(`export const deploymentPolicyVersion = ${sourceVersion};`).toString('base64')}'}); if(p.endsWith('/pulls/7')) return Response.json(remotes[Math.min(prReads++,remotes.length-1)]); if(p.includes('/actions/workflows/')) return Response.json({workflow_runs:[${JSON.stringify(run)}]}); if(p.includes('/jobs')) return Response.json({jobs:${JSON.stringify(latestJobs)}}); throw new Error('Unexpected API:'+p);};`,
		);
		const result = spawnSync(process.execPath, [new URL('authorize.mjs', import.meta.url).pathname], {
			encoding: 'utf8',
			timeout: 5000,
			env: {
				PATH: process.env.PATH,
				NODE_OPTIONS: '--import ' + join(root, 'services.mjs'),
				GH_TOKEN: 'fixture',
				GITHUB_EVENT_PATH: join(root, 'event.json'),
				GITHUB_EVENT_NAME: event.inputs ? 'workflow_dispatch' : 'pull_request',
				GITHUB_REF: 'refs/heads/develop',
				GITHUB_OUTPUT: join(root, 'output'),
				GITHUB_STEP_SUMMARY: join(root, 'summary'),
			},
		});
		return {
			status: result.status,
			error: result.stderr,
			output: await readFile(join(root, 'output'), 'utf8').catch(() => ''),
		};
	} finally {
		await rm(root, { recursive: true, force: true });
	}
}
test('real authorization accepts explicit current draft after quick checks, even when full draft guard failed', async () => {
	const result = await authorize({ ref: 'refs/heads/develop', inputs: { pr: '7', sha } }, pr, [
		...jobs,
		{ name: 'ci-complete', status: 'completed', conclusion: 'failure' },
	]);
	assert.equal(result.status, 0, result.error);
	assert.match(result.output, /deploy=true/);
	assert.match(result.output, /production=false/);
});
test('real authorization rejects latest quick failure, forks and stale manual SHA before any deployment output', async () => {
	for (const [remote, latestJobs, event] of [
		[pr, [{ ...jobs[0], conclusion: 'failure' }, ...jobs.slice(1)], { ref: 'develop', inputs: { pr: '7', sha } }],
		[
			{ ...pr, head: { ...pr.head, repo: { full_name: 'fork/repo' } } },
			jobs,
			{ ref: 'develop', inputs: { pr: '7', sha } },
		],
		[pr, jobs, { ref: 'develop', inputs: { pr: '7', sha: 'b'.repeat(40) } }],
	]) {
		const result = await authorize(event, remote, latestJobs);
		assert.notEqual(result.status, 0);
		assert.equal(result.output, '');
	}
});
test('late conversion/synchronize events cannot cancel a newer ready or explicitly requested draft build', async () => {
	for (const action of ['converted_to_draft', 'synchronize'])
		for (const remote of [
			{ ...pr, draft: false },
			{ ...pr, head: { ...pr.head, sha: 'b'.repeat(40) } },
		]) {
			const result = await authorize({ action, pull_request: pr }, remote);
			assert.notEqual(result.status, 0);
			assert.equal(result.output, '');
		}
	const result = await authorize({ action: 'converted_to_draft', pull_request: pr });
	assert.equal(result.status, 0, result.error);
	assert.match(result.output, /deploy=false/);
});
test('the actual workflow compatibility command refuses legacy source with an actionable rebase message', async () => {
	const yaml = await readFile(new URL('../../.github/workflows/deploy.yml', import.meta.url), 'utf8');
	const command = yaml.match(/node --input-type=module -e "(.+)"/)[1];
	const root = await mkdtemp(join(tmpdir(), 'capsule-compatibility-'));
	try {
		const { mkdir } = await import('node:fs/promises');
		await mkdir(join(root, 'tools/deployment'), { recursive: true });
		for (const version of [undefined, 2]) {
			await writeFile(
				join(root, 'tools/deployment/policy.mjs'),
				version === undefined ? 'export const old=true;' : 'export const deploymentPolicyVersion=2;',
			);
			const result = spawnSync(process.execPath, ['--input-type=module', '-e', command], {
				cwd: root,
				encoding: 'utf8',
			});
			if (version === 2) assert.equal(result.status, 0, result.stderr);
			else {
				assert.notEqual(result.status, 0);
				assert.match(result.stderr, /Rebase this PR onto updated develop\/main/);
			}
		}
	} finally {
		await rm(root, { recursive: true, force: true });
	}
});

test('legacy source is refused immediately with a rebase instruction before quick-check waiting', async () => {
	const result = await authorize({ ref: 'develop', inputs: { pr: '7', sha } }, pr, [], 1);
	assert.notEqual(result.status, 0);
	assert.match(result.error, /Rebase this PR/);
	assert.equal(result.output, '');
});

test('a new head after initial authorization invalidates the request before quick checks or outputs', async () => {
	const result = await authorize({ ref: 'develop', inputs: { pr: '7', sha } }, [
		pr,
		{ ...pr, head: { ...pr.head, sha: 'b'.repeat(40) } },
	]);
	assert.notEqual(result.status, 0);
	assert.match(result.error, /PR changed/);
	assert.equal(result.output, '');
});
