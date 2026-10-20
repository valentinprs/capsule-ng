import assert from 'node:assert/strict';
import test from 'node:test';
import { durations, fullE2E, parseShard, shardSpecs } from './e2e-plan.mjs';
const specs = Object.keys(durations).map((name) => 'apps/app-e2e/src/e2e/' + name);
test('pushes and CI changes run every e2e project; other PRs run affected projects only', () => {
	assert(fullE2E('push', []));
	assert(fullE2E('pull_request', ['libs/caps/x.ts', '.github/workflows/ci.yml']));
	assert(fullE2E('pull_request', ['tools/ci/e2e.mjs']));
	assert(!fullE2E('pull_request', ['libs/caps/x.ts', 'tools/deployment/x.mjs']));
	assert(!fullE2E('pull_request', []));
});
test('shards are parsed strictly', () => {
	assert.deepEqual(parseShard('2/3'), { index: 2, total: 3 });
	assert.deepEqual(parseShard(undefined), { index: 1, total: 1 });
	for (const shard of ['0/3', '4/3', '1', 'a/b']) assert.throws(() => parseShard(shard), /Invalid shard/);
});
test('shards cover every spec exactly once, including unknown specs, whatever the input order', () => {
	const all = [...specs, 'apps/app-e2e/src/e2e/new.cy.ts'];
	const shards = [1, 2, 3].map((index) => shardSpecs(all, { index, total: 3 }));
	assert.deepEqual(shards.flat().sort(), [...all].sort());
	assert.deepEqual(
		[1, 2, 3].map((index) => shardSpecs([...all].reverse(), { index, total: 3 })),
		shards,
	);
	assert.deepEqual(shardSpecs(all, { index: 1, total: 1 }), [...all].sort());
});
test('shards are balanced by measured duration', () => {
	const seconds = [1, 2, 3].map((index) =>
		shardSpecs(specs, { index, total: 3 }).reduce((sum, spec) => sum + durations[spec.split('/').at(-1)], 0),
	);
	const total = Object.values(durations).reduce((sum, value) => sum + value, 0);
	assert(Math.max(...seconds) - Math.min(...seconds) < 60, `unbalanced shards: ${seconds}`);
	assert(Math.max(...seconds) < total / 3 + 60);
});
