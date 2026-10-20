const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.cjs');

module.exports = [
	...baseConfig,
	{
		files: ['**/*.json'],
		rules: {
			'@nx/dependency-checks': [
				'error',
				{
					// Nx's TS graph cannot see the runtime CSS imports staged for ng-packagr.
					ignoredDependencies: [
						'@analogjs/vite-plugin-angular',
						'@nx/vite',
						'vite',
						'tailwindcss',
						'@fontsource/inter',
						'@fontsource/geist-mono',
						'@fontsource-variable/noto-sans-arabic',
						'@fontsource-variable/noto-sans-hebrew',
					],
					ignoredFiles: [
						'{projectRoot}/eslint.config.{js,cjs,mjs}',
						'{projectRoot}/vite.config.{ts,mts}',
						'{projectRoot}/**/test-setup.ts',
						'{projectRoot}/**/*.spec.ts',
						'{projectRoot}/**/testing/**',
						'{projectRoot}/**/*.stories.ts',
						'{projectRoot}/**/*.figma.ts',
						'{projectRoot}/code-connect/**',
					],
				},
			],
		},
		languageOptions: {
			parser: require('jsonc-eslint-parser'),
		},
	},
	...nx.configs['flat/angular'],
	...nx.configs['flat/angular-template'],
	{
		files: ['**/*.ts'],
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'caps',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: ['element', 'attribute'],
					prefix: 'caps',
					style: 'kebab-case',
				},
			],
			'@angular-eslint/no-input-rename': 'off',
			'@angular-eslint/directive-class-suffix': 'off',
			'@angular-eslint/component-class-suffix': 'off',
			'@angular-eslint/prefer-output-readonly': 'error',
			'@angular-eslint/prefer-on-push-component-change-detection': ['error'],
			'@angular-eslint/prefer-signals': ['error'],
			'@nx/workspace-avoid-component-styles': 'error',
		},
	},
	{
		files: ['**/*.html'],
		// Override or add rules here
		rules: {
			'@angular-eslint/template/interactive-supports-focus': 'off',
			'@angular-eslint/template/click-events-have-key-events': 'off',
		},
	},
];
