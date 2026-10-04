import { execFileSync } from 'node:child_process';
import { rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
const projects = JSON.parse(
	execFileSync('pnpm', ['exec', 'nx', 'show', 'projects', '--affected', '--json'], {
		encoding: 'utf8',
		env: { ...process.env, NX_DAEMON: 'false' },
	}),
);
const configurations = {
	spartan: null,
	'eslint-rules': ['tsc', 'tools/eslint-rules/tsconfig.lint.json'],
	app: ['ngc', 'apps/app/tsconfig.app.json'],
	'ui-storybook': ['tsc', 'apps/ui-storybook/.storybook/tsconfig.json'],
	caps: ['ngc', 'libs/caps/tsconfig.lib.json'],
	brain: ['ngc', 'libs/brain/tsconfig.lib.json'],
	helm: ['ngc', 'libs/helm/tsconfig.lib.json'],
	trpc: ['ngc', 'libs/trpc/tsconfig.lib.json'],
	tools: ['tsc', 'libs/tools/tsconfig.lib.json'],
	'app-e2e': null,
	'ui-storybook-e2e': null,
	'trpc-app-e2e': null,
	styles: ['tsc', 'libs/styles/tsconfig.lib.json'],
};
let checked = 0;
for (const project of projects) {
	const entry = configurations[project];
	if (!(project in configurations)) throw new Error(`Missing typecheck configuration for affected project ${project}`);
	if (entry === null) {
		console.log(`Typecheck ${project}: no production typecheck target (root configuration or E2E runtime suite).`);
		continue;
	}
	const [compiler, config] = entry;
	// ngc must typecheck templates and source aliases, without library rootDir restrictions.
	const path = resolve(config);
	const temporary = join(path.slice(0, path.lastIndexOf('/')), '.tsconfig.ci.json');
	writeFileSync(
		temporary,
		JSON.stringify({
			extends: './' + path.split('/').at(-1),
			compilerOptions: { noEmit: true, rootDir: resolve('.') },
			angularCompilerOptions: { compilationMode: 'full' },
		}),
	);
	try {
		console.log(`Typecheck ${project} (${compiler})`);
		execFileSync('pnpm', ['exec', compiler, '-p', temporary], { stdio: 'inherit' });
		checked++;
	} finally {
		rmSync(temporary, { force: true });
	}
}
console.log(`Typechecked ${checked} production projects from ${projects.length} affected projects.`);
