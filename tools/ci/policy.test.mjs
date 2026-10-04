import assert from 'node:assert/strict';
import test from 'node:test';
import { completeValidation, fullJobs, fullValidation, latestQuickRun, quickJobs, quickResult } from './policy.mjs';
const pr = { number: 1, draft: true, head: { sha: 'sha' } };
const results = Object.fromEntries(fullJobs.map((name) => [name, 'success']));
const ready = { state: 'open', draft: false, head: { sha: 'sha' } };
test('drafts and conversion never count as full validation; ready and every ready SHA run full jobs', () => {
	assert(!fullValidation({ pull_request: pr }, 'pull_request'));
	assert.throws(() => completeValidation({ pull_request: pr }, 'pull_request', results, ready), /Draft/);
	for (const action of ['ready_for_review', 'synchronize', 'reopened', 'opened'])
		assert(fullValidation({ action, pull_request: { ...pr, draft: false } }, 'pull_request'));
	assert(!fullValidation({ action: 'converted_to_draft', pull_request: pr }, 'pull_request'));
	for (const branch of ['main', 'develop']) assert(fullValidation({ ref: 'refs/heads/' + branch }, 'push'));
	assert(!fullValidation({ ref: 'refs/heads/feature' }, 'push'));
});
test('the final gate refuses skipped or failed full jobs and changed PR state/SHA', () => {
	const event = { pull_request: { ...pr, draft: false } };
	completeValidation(event, 'pull_request', results, ready);
	for (const name of fullJobs)
		for (const status of ['skipped', 'failure', 'cancelled'])
			assert.throws(() => completeValidation(event, 'pull_request', { ...results, [name]: status }, ready));
	for (const remote of [
		{ ...ready, draft: true },
		{ ...ready, state: 'closed' },
		{ ...ready, head: { sha: 'new' } },
	])
		assert.throws(() => completeValidation(event, 'pull_request', results, remote));
});
test('draft preview authorizes quick jobs without treating skipped heavy jobs or failed draft guard as successful full CI', () => {
	const jobs = quickJobs.map((name) => ({ name, status: 'completed', conclusion: 'success' }));
	assert.equal(quickResult([...jobs, { name: 'ci-complete', status: 'completed', conclusion: 'failure' }]), 'success');
	assert.equal(quickResult(jobs.slice(1)), 'pending');
	assert.equal(quickResult([{ ...jobs[0], status: 'in_progress' }, ...jobs.slice(1)]), 'pending');
	assert.equal(quickResult([{ ...jobs[0], conclusion: 'failure' }, ...jobs.slice(1)]), 'failure');
});
test('only the latest matching PR/head run can authorize; an older successful run cannot hide a new failure', () => {
	const context = { pr: 3, sha: 'new' };
	const run = { id: 1, head_sha: 'new', head_repository: { full_name: 'repo' }, pull_requests: [{ number: 3 }] };
	assert.equal(latestQuickRun([run, { ...run, id: 2 }], context, 'repo').id, 2);
	assert.equal(
		latestQuickRun(
			[
				{ ...run, head_sha: 'old' },
				{ ...run, head_repository: { full_name: 'fork' } },
				{ ...run, pull_requests: [{ number: 4 }] },
			],
			context,
			'repo',
		),
		undefined,
	);
});
