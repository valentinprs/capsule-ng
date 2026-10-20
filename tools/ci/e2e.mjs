// Runs one e2e matrix job: E2E_PROJECT, sharded by E2E_SHARD (`<index>/<total>`). On PRs it skips
// projects that are not affected, unless the CI itself changed. NX_BASE/NX_HEAD come from nx-set-shas.
// `--plan` only writes `run=true|false` to GITHUB_OUTPUT, so a skipped job does not install Cypress.
import { execFileSync } from 'node:child_process';
import { appendFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fullE2E, parseShard, shardSpecs } from './e2e-plan.mjs';
const project = process.env.E2E_PROJECT;
const shard = parseShard(process.env.E2E_SHARD);
const run = (command, args) =>
	execFileSync(command, args, { encoding: 'utf8', env: { ...process.env, NX_DAEMON: 'false' } });
const changed = run('git', ['diff', '--name-only', `${process.env.NX_BASE}...${process.env.NX_HEAD}`])
	.split('\n')
	.filter(Boolean);
const needed =
	fullE2E(process.env.GITHUB_EVENT_NAME, changed) ||
	JSON.parse(run('pnpm', ['exec', 'nx', 'show', 'projects', '--affected', '--json'])).includes(project);
if (process.argv.includes('--plan')) {
	console.log(needed ? `${project} e2e runs.` : `${project} is not affected by this PR; skipping its e2e.`);
	appendFileSync(process.env.GITHUB_OUTPUT, `run=${needed}\n`);
	process.exit(0);
}
if (!needed) process.exit(0);
const args = ['exec', 'nx', 'run', `${project}:e2e`, '--outputStyle=stream'];
if (shard.total > 1) {
	const root = resolve('apps', project, 'src', 'e2e');
	const specs = readdirSync(root, { recursive: true })
		.filter((file) => file.endsWith('.cy.ts'))
		.map((file) => resolve(root, file));
	const selected = shardSpecs(specs, shard);
	console.log(`${project} shard ${shard.index}/${shard.total}:\n${selected.join('\n')}`);
	if (selected.length === 0) process.exit(0);
	args.push(`--spec=${selected.join(',')}`);
}
execFileSync('pnpm', args, { stdio: 'inherit' });
