import { spawn } from 'node:child_process';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import {
	commentMarker,
	deploymentContext,
	deploymentUrl,
	isCurrent,
	ownsPreview,
	previewAlias,
	repository,
} from './policy.mjs';

const stage = process.argv[2];
if (!['build', 'publish'].includes(stage)) throw new Error('Expected build or publish stage');
const context = deploymentContext(JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8')));
for (const key of [
	'VERCEL_TOKEN',
	'VERCEL_ORG_ID',
	'VERCEL_CATALOGUE_PROJECT_ID',
	'VERCEL_STORYBOOK_PROJECT_ID',
	'GH_TOKEN',
]) {
	if (!process.env[key]) throw new Error(`Missing ${key}. See docs/deployment.md.`);
}
const projects = [
	{ name: 'capsule-ng', id: process.env.VERCEL_CATALOGUE_PROJECT_ID, config: 'vercel.json' },
	{
		name: 'capsule-ng-storybook',
		id: process.env.VERCEL_STORYBOOK_PROJECT_ID,
		config: 'tools/deployment/storybook.vercel.json',
	},
];
async function api(path, { github = false, method = 'GET', body, allow404 = false } = {}) {
	const url = new URL(path, github ? 'https://api.github.com' : 'https://api.vercel.com');
	if (!github) url.searchParams.set('teamId', process.env.VERCEL_ORG_ID);
	const res = await fetch(url, {
		method,
		headers: {
			Authorization: `Bearer ${github ? process.env.GH_TOKEN : process.env.VERCEL_TOKEN}`,
			'Content-Type': 'application/json',
			'User-Agent': 'capsule-deployment',
		},
		body: body === undefined ? undefined : JSON.stringify(body),
	});
	if (res.status === 404 && allow404) return null;
	if (!res.ok) throw new Error(`${method} ${url.pathname}: ${res.status}`);
	return res.status === 204 ? null : res.json();
}
const github = (path, options = {}) => api(`/repos/${repository}${path}`, { ...options, github: true });
async function current() {
	const remote = await github(context.production ? '/commits/main' : `/pulls/${context.pr}`);
	return isCurrent(context, remote);
}
function cli(args, project, capture = false) {
	return new Promise((resolve, reject) => {
		// Never echo command arguments: the CLI token belongs only in the child process.
		const child = spawn('npx', ['--yes', 'vercel@62.1.0', ...args, '--token', process.env.VERCEL_TOKEN], {
			env: {
				...process.env,
				VERCEL_PROJECT_ID: project.id,
				VERCEL_ENV: context.production ? 'production' : 'preview',
				VITE_SITE_URL: context.production
					? 'https://capsule-ng.vercel.app'
					: `https://${previewAlias('capsule-ng', context.pr)}`,
				VITE_SOURCE_REF: context.sha,
			},
			stdio: ['ignore', capture ? 'pipe' : 'inherit', 'inherit'],
		});
		let output = '';
		child.stdout?.on('data', (chunk) => {
			output += chunk;
		});
		child.on('error', reject);
		child.on('close', (code) =>
			code === 0 ? resolve(output.trim()) : reject(new Error(`Vercel ${args[0]} failed (${code})`)),
		);
	});
}
async function comment(body) {
	let found;
	for (let page = 1; ; page++) {
		const comments = await github(`/issues/${context.pr}/comments?per_page=100&page=${page}`);
		found = comments.find((c) => c.user.login === 'github-actions[bot]' && c.body.includes(commentMarker));
		if (found || comments.length < 100) break;
	}
	await github(found ? `/issues/comments/${found.id}` : `/issues/${context.pr}/comments`, {
		method: found ? 'PATCH' : 'POST',
		body: { body: `${commentMarker}\n${body}` },
	});
}
async function cleanup(project) {
	// Fetch full details before deletion. Both project ownership and our PR metadata must match.
	let until;
	do {
		if ((await github(`/pulls/${context.pr}`)).state !== 'closed') return;
		const page = await api(`/v6/deployments?projectId=${project.id}&limit=100${until ? `&until=${until}` : ''}`);
		for (const item of page.deployments) {
			if (
				item.meta?.capsulePr !== String(context.pr) ||
				item.meta?.capsuleRepository !== repository ||
				item.target === 'production'
			)
				continue;
			const deployment = await api(`/v13/deployments/${item.uid}`, { allow404: true });
			if (!deployment || !ownsPreview(deployment, project.id, context.pr)) continue;
			if ((await github(`/pulls/${context.pr}`)).state !== 'closed') return;
			const aliases = await api(`/v2/deployments/${item.uid}/aliases`);
			for (const alias of aliases.aliases) {
				if (alias.alias === previewAlias(project.name, context.pr))
					await api(`/v2/aliases/${alias.uid}`, { method: 'DELETE', allow404: true });
			}
			await api(`/v13/deployments/${item.uid}`, { method: 'DELETE', allow404: true });
		}
		until = page.pagination?.next;
	} while (until);
}
if (stage === 'publish' && context.cleanup) {
	if ((await github(`/pulls/${context.pr}`)).state !== 'closed') process.exit(0);
	for (const project of projects) await cleanup(project);
	await comment('PR closed. Preview deployments have been removed.');
} else if (stage === 'build' && !context.cleanup && (await current())) {
	const results = [];
	for (const project of projects) {
		try {
			if (!(await current())) break;
			await rm('.vercel', { recursive: true, force: true });
			await mkdir('.vercel', { recursive: true });
			await writeFile(
				'.vercel/project.json',
				JSON.stringify({ orgId: process.env.VERCEL_ORG_ID, projectId: project.id }),
			);
			await cli(['pull', '--yes', `--environment=${context.production ? 'production' : 'preview'}`], project);
			await cli(
				['build', '--yes', '--local-config', project.config, ...(context.production ? ['--prod'] : [])],
				project,
			);
			if (!(await current())) break;
			const output = await cli(
				[
					'deploy',
					'--prebuilt',
					'--yes',
					'--local-config',
					project.config,
					'--meta',
					`capsuleRepository=${repository}`,
					'--meta',
					`capsulePr=${context.pr || ''}`,
					'--meta',
					`capsuleSha=${context.sha}`,
					...(context.production ? ['--prod', '--skip-domain'] : []),
				],
				project,
				true,
			);
			const url = deploymentUrl(output);
			results.push({ name: project.name, url, sha: context.sha });
		} catch (error) {
			results.push({ name: project.name, error: error.message, sha: context.sha });
			process.exitCode = 1;
		}
	}
	await writeFile('deployment-results.json', JSON.stringify(results));
} else if (stage === 'publish' && !context.cleanup && (await current())) {
	const results = JSON.parse(await readFile('deployment-results.json', 'utf8'));
	const lines = [];
	for (const result of results) {
		const project = projects.find((project) => project.name === result.name);
		if (!project || result.sha !== context.sha) throw new Error('Invalid build result');
		if (result.error) {
			lines.push(`- **${project.name}**: build failed. See workflow logs.`);
			process.exitCode = 1;
			continue;
		}
		// Verify uploaded artifacts refer to our own deployment, never trust an artifact URL alone.
		const deployment = await api(`/v13/deployments/${new URL(result.url).hostname}`);
		if (
			deployment.projectId !== project.id ||
			deployment.meta?.capsuleRepository !== repository ||
			deployment.meta?.capsuleSha !== context.sha ||
			(!context.production && !ownsPreview(deployment, project.id, context.pr))
		)
			throw new Error('Deployment ownership mismatch');
		if (!(await current())) break;
		if (context.production) await cli(['promote', result.url, '--yes'], project);
		else await cli(['alias', 'set', result.url, previewAlias(project.name, context.pr)], project);
		lines.push(
			`- **${project.name}**: [Ready](https://${context.production ? `${project.name}.vercel.app` : previewAlias(project.name, context.pr)}) — ${context.sha.slice(0, 7)}`,
		);
	}
	if (!context.production && (await current()))
		await comment(`Preview results for commit \`${context.sha}\`:\n\n${lines.join('\n')}`);
	console.log(lines.join('\n'));
}
