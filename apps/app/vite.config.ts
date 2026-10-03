/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import * as path from 'node:path';
import { visualizer } from 'rollup-plugin-visualizer';
import { type Plugin, defineConfig, splitVendorChunkPlugin } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { CATALOGUE_URL } from './src/site.config';
import { getPrerenderedRoutes } from './src/utils/prerender-routes';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	// In dev the Analog Nitro server builds its public-asset manifest from `output.publicDir`
	// (default: dist/<app>/analog/public), which `nx serve` never populates - the docs JSON is
	// generated into src/public (Vite's publicDir) instead. Point Nitro at the same source dir so a
	// server-side $fetch('/data/..') from our page loaders resolves without a prior production build.
	const isServe = command === 'serve';
	const siteUrl = process.env['VITE_SITE_URL'] || CATALOGUE_URL;
	const preview = process.env['VERCEL_ENV'] === 'preview';

	return {
		root: __dirname,
		publicDir: 'src/public',
		optimizeDeps: {
			// Deps Vite would otherwise only discover while a page loads: a mid-session re-optimization
			// reloads the page and, on a cold cache (CI), the docs pages then never hydrate.
			include: [
				'@angular/common',
				'@angular/forms',
				'isomorphic-fetch',
				'@trpc/**/*',
				'h3',
				'ufo',
				'marked',
				'marked-gfm-heading-id',
				'marked-highlight',
				'prismjs/**/*',
				'@ng-icons/remixicon',
				'@ng-icons/tabler-icons',
				'@angular/cdk/menu',
				'luxon',
				'@angular/cdk/portal',
				'@angular/cdk/observers',
				'@angular/cdk/listbox',
				'@angular/cdk/collections',
				'embla-carousel-autoplay',
				'embla-carousel-angular',
				'@tanstack/angular-table',
				'@angular/cdk/clipboard',
				'@angular/cdk/keycodes',
				'@angular/cdk/observers/private',
				'@angular/cdk/platform',
				'@angular/cdk/scrolling',
				'prismjs/components/prism-bash',
				'prismjs/components/prism-css',
				'prismjs/components/prism-javascript',
				'prismjs/components/prism-json',
				'prismjs/components/prism-markup',
				'prismjs/components/prism-typescript',
				'@angular/forms/signals',
				'@angular/cdk/stepper',
				'@angular/cdk/text-field',
				'@angular/cdk/coercion',
				'@tanstack/charts',
				'@tanstack/charts/scales/linear',
				'@tanstack/charts/scales/point',
				'@tanstack/charts/scales/band',
				'@tanstack/charts/tooltip',
				'@tanstack/angular-charts',
				'zod',
			],
		},
		ssr: {
			noExternal: [
				'@spartan-ng/**',
				'@angular/cdk/**',
				'@ng-icons/**',
				'ngx-scrollbar/**',
				'@analogjs/trpc',
				'@trpc/server',
				'@tanstack/angular-charts',
			],
		},
		build: {
			outDir: '../../dist/apps/app/client',
			// Skip computing gzip sizes for every chunk - it is only an informational report.
			reportCompressedSize: false,
			commonjsOptions: { transformMixedEsModules: true },
			target: ['es2020'],
		},
		resolve: {
			alias: {
				'~': path.resolve(__dirname, './src'),
			},
		},
		plugins: [
			tsconfigPaths(),
			{
				name: 'custom-url-and-date-replacer', // replaced @rollup/plugin-replace given compatibility issues with latest vite
				transform(code, id) {
					try {
						if (id.endsWith('.js') || id.endsWith('.html')) {
							const transformedCode = code
								.replace(/http:\/\/127\.0\.0\.1:4200/g, siteUrl)
								.replace(/__LASTMOD__/g, JSON.stringify(new Date().toISOString()));
							return {
								code: transformedCode,
								map: null,
							};
						}
					} catch (error) {
						console.error('Error in custom-url-and-date-replacer:', error);
						// Optionally rethrow or handle the error further
						throw error;
					}
					return null; // No transformation applied
				},
			},
			analog({
				content: {
					highlighter: 'prism',
				},
				prerender: {
					routes: async () => {
						const staticRoutes = [
							'/',
							'/colors',

							'/documentation/introduction',
							'/documentation/changelog',
							'/documentation/about',

							'/documentation/installation',
							'/documentation/theming',
							'/documentation/dark-mode',
							'/documentation/typography',
							'/documentation/figma',
							'/documentation/version-support',
							'/documentation/rtl',
							'/documentation/styles',
							'/documentation/scroll-fade',
							'/documentation/shimmer',

							'/blocks/sidebar',
							'/blocks/calendar',
							'/blocks/login',
							'/blocks/signup',
							'/blocks/stepper',

							'/forms',
							'/forms/reactive-forms',
							'/forms/signal-forms',

							'/stack/overview',
							'/stack/technologies',
							'/stack/installation',
						];

						return await getPrerenderedRoutes(staticRoutes);
					},
					sitemap: preview ? undefined : { host: siteUrl },
				},
				nitro: {
					logLevel: 4,
					routeRules: preview ? { '/**': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } } } : {},
					...(isServe ? { output: { publicDir: path.resolve(__dirname, 'src/public') } } : {}),
					prerender: {
						concurrency: 1,
					},
					serverAssets: [
						{
							baseName: 'data',
							dir: path.resolve(__dirname, 'src/public/data'),
						},
					],
					rollupConfig: {
						plugins: [],
					},
				},
			}),
			nxViteTsPaths(),
			{
				name: 'capsule-robots',
				generateBundle() {
					this.emitFile({
						type: 'asset',
						fileName: 'robots.txt',
						source: preview
							? 'User-agent: *\nDisallow: /\n'
							: `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`,
					});
				},
			},
			splitVendorChunkPlugin(),
			// Bundle analysis is opt-in (ANALYZE=1) so it does not traverse the whole bundle on
			// every production build.
			...(process.env.ANALYZE ? [visualizer() as Plugin] : []),
		],
		test: {
			reporters: ['default'],
			coverage: {
				reportsDirectory: '../../coverage/apps/app',
				provider: 'v8',
			},
			globals: true,
			environment: 'jsdom',
			// Vitest blanks CSS modules (even `?raw` imports) unless they are opted in here; the docs
			// render the caps color tokens from the stylesheet source.
			css: { include: [/caps-tokens\.css/] },
			setupFiles: ['src/test-setup.ts'],
			include: ['**/*.spec.ts'],
			// Run the suite in a single forked process. The AppComponent smoke test boots the full app
			// shell, and the Analog/vite-plugin-angular transform of that deep import graph is heavy;
			// spawning a worker per core multiplied that footprint and intermittently OOM-crashed a
			// vitest worker in CI (exit 1, no output) when several nx projects tested in parallel. One
			// memory-bounded fork keeps the docs app's footprint predictable. The suite is tiny, so the
			// loss of intra-suite parallelism is negligible.
			pool: 'forks',
			poolOptions: {
				forks: {
					minForks: 1,
					maxForks: 1,
				},
			},
			cache: {
				dir: '../../node_modules/.vitest',
			},
		},
		define: {
			'import.meta.vitest': mode !== 'production',
		},
		server: {
			fs: {
				allow: ['../..'],
			},
		},
	};
});
