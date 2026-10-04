import assert from 'node:assert/strict';
import test from 'node:test';
import { deploymentContext, isCurrent, previewRequested, repository } from './policy.mjs';
const sha = 'a'.repeat(40);
const pr = {
	number: 7,
	draft: true,
	state: 'open',
	head: { sha, repo: { full_name: repository } },
	base: { repo: { full_name: repository } },
};
const manual = { ref: 'refs/heads/develop', inputs: { pr: '7', sha } };
test('draft previews are one-shot explicit requests, never activated by a persistent label on later pushes', () => {
	assert.throws(() =>
		deploymentContext({ action: 'synchronize', pull_request: pr, labels: [{ name: 'capsule-preview' }] }),
	);
	const event = { action: 'labeled', label: { name: 'capsule-preview' }, pull_request: pr };
	assert(previewRequested(event));
	assert(deploymentContext(event).requested);
	assert(!previewRequested({ ...event, action: 'synchronize' }));
	assert.throws(() => deploymentContext({ ...event, label: { name: 'other' } }));
	assert(!deploymentContext({ action: 'ready_for_review', pull_request: { ...pr, draft: false } }).requested);
});
test('manual request pins open same-repo PR and SHA, with no production or arbitrary ref input', () => {
	assert.deepEqual(deploymentContext(manual, pr), { pr: 7, sha, production: false, cleanup: false, requested: true });
	for (const event of [
		{ ...manual, ref: 'feature' },
		{ ...manual, inputs: { pr: '7', sha: 'old' } },
		{ ...manual, inputs: { pr: '7;echo unsafe', sha } },
	])
		assert.throws(() => deploymentContext(event, pr));
	for (const remote of [
		{ ...pr, state: 'closed' },
		{ ...pr, number: 8 },
		{ ...pr, head: { ...pr.head, sha: 'b'.repeat(40) } },
		{ ...pr, head: { ...pr.head, repo: { full_name: 'fork' } } },
	])
		assert.throws(() => deploymentContext(manual, remote));
	const result = deploymentContext({ ...manual, inputs: { ...manual.inputs, production: 'true', sha } }, pr);
	assert.equal(result.production, false);
});
test('publication rechecks SHA, ownership and draft state; explicit current draft requests remain allowed', () => {
	const automatic = { pr: 7, sha, production: false };
	assert(!isCurrent(automatic, pr));
	assert(isCurrent({ ...automatic, requested: true }, pr));
	assert(!isCurrent({ ...automatic, requested: true }, { ...pr, head: { ...pr.head, sha: 'new' } }));
	assert(!isCurrent({ ...automatic, requested: true }, { ...pr, head: { ...pr.head, repo: { full_name: 'fork' } } }));
	assert(deploymentContext({ action: 'closed', pull_request: pr }).cleanup);
});
