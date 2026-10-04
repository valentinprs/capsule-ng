import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { chmod, copyFile, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { repository } from './policy.mjs';

for (const production of [false, true]) {
	test(`actual ${production ? 'production' : 'preview'} upload command archives both prebuilt projects`, async () => {
		const root = await mkdtemp(join(tmpdir(), 'capsule-upload-'));
		try {
			await mkdir(join(root, 'tools/deployment'), { recursive: true });
			await mkdir(join(root, 'bin'));
			// Execute the production entrypoint in an isolated filesystem. Only its external
			// services, CLI and already-tested catalogue data check are fixtures.
			for (const file of ['deploy.mjs', 'policy.mjs'])
				await copyFile(new URL(file, import.meta.url), join(root, 'tools/deployment', file));
			await writeFile(
				join(root, 'tools/deployment/check-catalogue-data.mjs'),
				'console.log("catalogue data checked");',
			);
			const event = production
				? {
						workflow_run: {
							event: 'push',
							head_branch: 'main',
							conclusion: 'success',
							repository: { full_name: repository },
							head_sha: 'current-sha',
						},
					}
				: {
						action: 'synchronize',
						pull_request: {
							number: 65,
							head: { sha: 'current-sha', repo: { full_name: repository } },
							base: { repo: { full_name: repository } },
						},
					};
			await writeFile(join(root, 'event.json'), JSON.stringify(event));
			await writeFile(
				join(root, 'services.mjs'),
				`
    globalThis.fetch = async (url) => {
     const path = new URL(url).pathname;
     if (path.startsWith('/v9/projects/')) return Response.json({targets:{production:{id:'initialized'}}});
     if (path.endsWith('/commits/main')) return Response.json({sha:'current-sha'});
     if (path.endsWith('/pulls/65')) return Response.json({state:'open',head:{sha:'current-sha'}});
     throw new Error('Unexpected network request: '+path);
    };
   `,
			);
			const cli = join(root, 'bin/npx');
			await writeFile(
				cli,
				`#!/usr/bin/env node
    const {appendFileSync} = require('node:fs');
    const args=process.argv.slice(2);
    if(args.includes('deploy')) {
     appendFileSync('uploads.jsonl', JSON.stringify({project:process.env.VERCEL_PROJECT_ID,args:args.filter((value,index)=>value!=='--token'&&args[index-1]!=='--token')})+'\\n');
     if(!args.includes('--archive=tgz')) {console.error('api-upload-free: per-file uploads exhausted; use --archive=tgz');process.exit(1);}
     console.log('https://'+process.env.VERCEL_PROJECT_ID+'-fixture.vercel.app');
    }
   `,
			);
			await chmod(cli, 0o755);
			const result = spawnSync(process.execPath, ['tools/deployment/deploy.mjs', 'build'], {
				cwd: root,
				encoding: 'utf8',
				timeout: 10000,
				env: {
					...process.env,
					PATH: join(root, 'bin') + ':' + process.env.PATH,
					NODE_OPTIONS: '--import ' + join(root, 'services.mjs'),
					GITHUB_EVENT_PATH: join(root, 'event.json'),
					VERCEL_TOKEN: 'fixture-token',
					GH_TOKEN: 'fixture-token',
					VERCEL_ORG_ID: 'fixture-team',
					VERCEL_CATALOGUE_PROJECT_ID: 'catalogue',
					VERCEL_STORYBOOK_PROJECT_ID: 'storybook',
				},
			});
			assert.equal(result.status, 0, result.stderr);
			const uploads = (await readFile(join(root, 'uploads.jsonl'), 'utf8'))
				.trim()
				.split('\n')
				.map((line) => JSON.parse(line));
			assert.deepEqual(
				uploads.map((upload) => upload.project),
				['catalogue', 'storybook'],
			);
			for (const upload of uploads) {
				assert.ok(upload.args.includes('--prebuilt'));
				assert.ok(upload.args.includes('--archive=tgz'));
				assert.ok(upload.args.includes(production ? '--prod' : '--target=preview'));
				assert.ok(upload.args.includes('capsuleSha=current-sha'));
				assert.ok(upload.args.includes('capsuleRepository=' + repository));
				assert.equal(upload.args.includes('--skip-domain'), production);
			}
			const results = JSON.parse(await readFile(join(root, 'deployment-results.json'), 'utf8'));
			assert.equal(results.length, 2);
			assert.ok(results.every((result) => result.url && result.sha === 'current-sha' && !result.error));
		} finally {
			await rm(root, { recursive: true, force: true });
		}
	});
}
