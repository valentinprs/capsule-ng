import { appendFile, readFile } from 'node:fs/promises';
import { latestQuickRun, quickResult } from '../ci/policy.mjs';
import { currentDraftEvent, deploymentContext, isCurrent, previewRequested, repository } from './policy.mjs';
const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, 'utf8'));
async function github(path) {
	const response = await fetch(`https://api.github.com/repos/${repository}${path}`, {
		headers: { Authorization: `Bearer ${process.env.GH_TOKEN}`, 'User-Agent': 'capsule-deployment' },
	});
	if (!response.ok) throw new Error(`Authorization API ${response.status}`);
	return response.json();
}
const manual = process.env.GITHUB_EVENT_NAME === 'workflow_dispatch';
if (manual && !['refs/heads/main', 'refs/heads/develop'].includes(process.env.GITHUB_REF))
	throw new Error('Dispatch must run the workflow from main or develop.');
const requestedPR = manual ? Number(event.inputs?.pr) : event.pull_request?.number;
const remote = requestedPR ? await github(`/pulls/${requestedPR}`) : undefined;
if (remote && (remote.head.repo.full_name !== repository || remote.base.repo.full_name !== repository))
	throw new Error('Forks cannot access deployment credentials.');
if (
	event.pull_request &&
	(event.pull_request.head.sha !== remote.head.sha || (event.action === 'closed' && remote.state !== 'closed'))
)
	throw new Error('Obsolete PR event; it cannot cancel a newer preview.');
let deploy = true;
let context;
if (
	remote &&
	!previewRequested(event) &&
	(event.action === 'converted_to_draft' || (event.action !== 'closed' && remote.draft))
) {
	if (!currentDraftEvent(event, remote))
		throw new Error('Draft event is obsolete; current ready preview is preserved.');
	context = { pr: remote.number, sha: event.pull_request.head.sha, production: false, cleanup: false };
	deploy = false;
} else {
	context = deploymentContext(event, remote);
	if (remote && !context.cleanup && !isCurrent(context, remote))
		throw new Error('Request is stale or PR is closed/draft.');
}
if (context.production && !isCurrent(context, await github('/commits/main')))
	throw new Error('Production CI SHA is obsolete.');
if (deploy && !context.production && !context.cleanup) {
	const sourcePolicy = await github(`/contents/tools/deployment/policy.mjs?ref=${context.sha}`);
	if (
		sourcePolicy.encoding !== 'base64' ||
		!/export const deploymentPolicyVersion = 2;/.test(Buffer.from(sourcePolicy.content, 'base64').toString('utf8'))
	)
		throw new Error(
			'Rebase this PR onto updated develop/main before requesting a preview (deployment policy v2 required).',
		);
	const deadline = Date.now() + 10 * 60 * 1000;
	while (true) {
		const current = await github(`/pulls/${context.pr}`);
		if (!isCurrent(context, current)) throw new Error('PR changed while waiting for quick checks.');
		const { workflow_runs: runs } = await github(
			`/actions/workflows/ci.yml/runs?event=pull_request&head_sha=${context.sha}&per_page=20`,
		);
		const latest = latestQuickRun(runs, context, repository);
		const result = latest
			? quickResult((await github(`/actions/runs/${latest.id}/jobs?per_page=100`)).jobs)
			: 'pending';
		if (result === 'failure') throw new Error('Latest quick checks failed; preview refused.');
		if (result === 'success') break;
		if (Date.now() >= deadline) throw new Error('Quick checks not ready. Retry the explicit request after they pass.');
		await new Promise((resolve) => setTimeout(resolve, 30000));
	}
}
for (const [key, value] of Object.entries({ ...context, deploy }))
	await appendFile(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
await appendFile(
	process.env.GITHUB_STEP_SUMMARY,
	deploy
		? `Authorized ${context.cleanup ? 'cleanup' : context.production ? 'production' : 'preview'} for ${context.sha}.\n`
		: 'Draft: no automatic preview. Superseded build is cancelled; use an explicit request after quick checks.\n',
);
