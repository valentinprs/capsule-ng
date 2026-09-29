/**
 * Static, helm-free scaffolding for an assembled StackBlitz project.
 * Helm component source is never here - it is vendored from manual-install-snippets.json
 * by the project builder. These templates only provide the Angular CLI + Tailwind shell.
 *
 * We use the Angular CLI esbuild builder (`@angular/build`) rather than a Vite/Analog SPA
 * setup: the CLI compiles standalone components correctly, honors tsconfig `paths` natively
 * (so the vendored helm aliases resolve), and runs reliably in StackBlitz WebContainers.
 */

import { CAPS_TOKENS_CSS } from '@spartan-ng/styles';

/**
 * StackBlitz installs with npm, whose strict peer resolution trips over the Angular/brain
 * peer ranges. `legacy-peer-deps` makes the install resolve the same way the workspace does.
 */
export const NPMRC = `legacy-peer-deps=true
`;

export const ANGULAR_JSON = `{
	"version": 1,
	"projects": {
		"spartan-ui-example": {
			"projectType": "application",
			"root": "",
			"sourceRoot": "src",
			"architect": {
				"build": {
					"builder": "@angular/build:application",
					"options": {
						"browser": "src/main.ts",
						"index": "src/index.html",
						"tsConfig": "tsconfig.app.json",
						"polyfills": ["zone.js"],
						"styles": ["src/styles.css"]
					}
				},
				"serve": {
					"builder": "@angular/build:dev-server",
					"options": { "buildTarget": "spartan-ui-example:build" }
				}
			}
		}
	}
}
`;

/** Tailwind v4 via the Angular CLI PostCSS pipeline. */
export const POSTCSS = `{
	"plugins": {
		"@tailwindcss/postcss": {}
	}
}
`;

/** Root tsconfig with the exact `@spartan-ng/helm/*` path aliases the CLI generator registered. */
export function tsconfigJson(paths: Record<string, string[]>): string {
	return JSON.stringify(
		{
			compilerOptions: {
				target: 'ES2022',
				module: 'ES2022',
				moduleResolution: 'bundler',
				experimentalDecorators: true,
				strict: true,
				skipLibCheck: true,
				esModuleInterop: true,
				useDefineForClassFields: false,
				baseUrl: '.',
				paths,
			},
			angularCompilerOptions: { strictTemplates: true },
		},
		null,
		2,
	);
}

export const TSCONFIG_APP = `{
	"extends": "./tsconfig.json",
	"compilerOptions": {
		"outDir": "./out-tsc/app"
	},
	"files": ["src/main.ts"],
	"include": ["src/**/*.ts"]
}
`;

export const INDEX_HTML = `<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>spartan/ui example</title>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
	</head>
	<body class="bg-background text-foreground">
		<app-root></app-root>
	</body>
</html>
`;

// `provideRouter([])` is always supplied: the breadcrumb and pagination helm components import
// `RouterLink`, and some examples inject `ActivatedRoute` - both need the Router available or
// bootstrap throws an injection error. It is harmless (no routes) for examples that don't use it.
export const MAIN_TS = `import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';

bootstrapApplication(App, {
	providers: [provideRouter([])],
}).catch((err) => console.error(err));
`;

/** Host component that renders the example via its own selector. */
export function appComponent(exampleClass: string, exampleSelector: string): string {
	return `import { Component } from '@angular/core';
import { ${exampleClass} } from './example';

@Component({
	selector: 'app-root',
	imports: [${exampleClass}],
	host: { class: 'block p-8' },
	template: \`<${exampleSelector} />\`,
})
export class App {}
`;
}

/** Fonts and radius; the light + dark colors come from the caps color tokens. */
const TOKENS = `:root {
	--font-sans: system-ui, sans-serif;
	--font-mono: ui-monospace, monospace;
	--radius: 0.625rem;
}

${CAPS_TOKENS_CSS}`;

/**
 * Build the global stylesheet. Mirrors the docs app's import structure: Tailwind's
 * `utilities.css` is imported UNLAYERED (not via `@import 'tailwindcss'`, which would put it
 * in `@layer utilities`). This matters because @ng-icons injects an unlayered `:host { display }`
 * style - layered utilities lose to it, so e.g. the accordion's `…:hidden` chevron toggle would
 * not apply. Unlayered utilities win the cascade as intended. The preset supplies `@theme`,
 * custom variants and `@utility`; its own `@import`s are stripped and re-declared at the top.
 */
export function stylesCss(presetCss: string): string {
	const presetWithoutImports = presetCss
		.split('\n')
		.filter((line) => !line.trim().startsWith('@import'))
		.join('\n')
		.trim();

	return `@layer theme, base, components, utilities;

@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/preflight.css' layer(base);
@import 'tailwindcss/utilities.css';
@import 'tw-animate-css';
@import '@angular/cdk/overlay-prebuilt.css';

@source './app/**/*.ts';
@source '../libs/**/*.ts';

${presetWithoutImports}

${TOKENS}

@layer base {
	* {
		@apply border-border;
	}
	body {
		@apply bg-background text-foreground;
	}
}
`;
}

export function packageJson(dependencies: Record<string, string>): string {
	const sorted = Object.fromEntries(Object.entries(dependencies).sort(([a], [b]) => a.localeCompare(b)));
	return JSON.stringify(
		{
			name: 'spartan-ui-example',
			private: true,
			scripts: {
				ng: 'ng',
				start: 'ng serve',
				build: 'ng build',
			},
			// The Angular CLI toolchain is kept in dependencies (not devDependencies) so the
			// StackBlitz WebContainer always installs it - some run configs skip devDependencies,
			// which would leave `ng` unavailable at start.
			dependencies: sorted,
		},
		null,
		2,
	);
}
