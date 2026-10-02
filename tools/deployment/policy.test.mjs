import assert from 'node:assert/strict';
import test from 'node:test';
import { deploymentContext, deploymentUrl, isCurrent, ownsPreview, previewAlias, repository } from './policy.mjs';
const pr = {
	number: 7,
	head: { sha: 'new', repo: { full_name: repository } },
	base: { repo: { full_name: repository } },
};
test('only PR lifecycle and successful main push CI can deploy', () => {
	for (const action of ['opened', 'synchronize', 'reopened'])
		assert.equal(deploymentContext({ action, pull_request: pr }).pr, 7);
	assert.equal(deploymentContext({ action: 'closed', pull_request: pr }).cleanup, true);
	assert.throws(() => deploymentContext({ ref: 'refs/heads/feature' }));
	assert.throws(() => deploymentContext({ action: 'edited', pull_request: pr }));
	assert.throws(() =>
		deploymentContext({
			action: 'opened',
			pull_request: { ...pr, head: { ...pr.head, repo: { full_name: 'fork/repo' } } },
		}),
	);
	const run = {
		event: 'push',
		head_branch: 'main',
		conclusion: 'success',
		head_sha: 'new',
		repository: { full_name: repository },
	};
	assert.equal(deploymentContext({ workflow_run: run }).production, true);
	for (const patch of [{ event: 'pull_request' }, { conclusion: 'failure' }, { head_branch: 'feature' }])
		assert.throws(() => deploymentContext({ workflow_run: { ...run, ...patch } }));
});
test('cleanup cannot delete production, another project or another PR', () => {
	const deployment = { projectId: 'one', target: null, meta: { capsulePr: '7', capsuleRepository: repository } };
	assert.equal(ownsPreview(deployment, 'one', 7), true);
	for (const change of [
		{ projectId: 'two' },
		{ target: 'production' },
		{ meta: { capsulePr: '8', capsuleRepository: repository } },
		{ meta: {} },
	])
		assert.equal(ownsPreview({ ...deployment, ...change }, 'one', 7), false);
});
test('old commits and closed PRs cannot replace the current deployment', () => {
	const context = { production: false, sha: 'new' };
	assert.equal(isCurrent(context, { state: 'open', head: { sha: 'new' } }), true);
	assert.equal(isCurrent(context, { state: 'closed', head: { sha: 'new' } }), false);
	assert.equal(isCurrent(context, { state: 'open', head: { sha: 'old' } }), false);
	assert.equal(isCurrent({ production: true, sha: 'old' }, { sha: 'new' }), false);
	assert.equal(previewAlias('capsule-ng', 7), 'capsule-ng-pr-7.vercel.app');
	assert.throws(() => previewAlias('other', 7));
});

test('CLI URL parsing supports plain and structured output', () => {
	assert.equal(deploymentUrl('https://capsule-ng-build.vercel.app\n'), 'https://capsule-ng-build.vercel.app');
	assert.equal(
		deploymentUrl(JSON.stringify({ url: 'https://capsule-ng-build.vercel.app' })),
		'https://capsule-ng-build.vercel.app',
	);
	assert.throws(() => deploymentUrl('https://example.org'));
});
