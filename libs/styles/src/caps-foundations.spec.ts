import tailwindcss from '@tailwindcss/postcss';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import postcss from 'postcss';
import { describe, expect, it } from 'vitest';

const workspace = resolve(__dirname, '../../..');
const read = (path: string) => readFileSync(resolve(workspace, path), 'utf8');

describe('Capsule public CSS foundations', () => {
	it('provides Inter and Geist Mono, shared metrics and Helm aliases through one entry point', async () => {
		const entry = resolve(workspace, 'libs/styles/src/caps-foundations.css');
		const result = await postcss([tailwindcss({ base: workspace, optimize: false })]).process(
			`@import '${workspace}/libs/brain/hlm-tailwind-preset.css'; @import '${entry}'; @import '${workspace}/libs/styles/src/caps-fonts.css'; @import '${workspace}/libs/caps/caps-preset.css' layer(caps); @source inline('font-sans font-mono text-sm rounded-lg p-2 shadow-sm transition-colors');`,
			{ from: resolve(workspace, 'caps-contract.css') },
		);
		expect(result.css).toContain("font-family: 'Inter'");
		expect(result.css).toContain("font-family: 'Geist Mono'");
		expect(result.css).toContain('--font-sans: var(--caps-font-sans)');
		expect(result.css).toContain('--radius: var(--caps-radius)');
		expect(result.css).toContain('--caps-font-sans:');
		expect(result.css).toContain('--caps-spacing:');
		for (const [size, value] of [
			['sm', '24rem'],
			['md', '28rem'],
			['lg', '32rem'],
		]) {
			expect(result.css).toContain(`--caps-card-max-width-${size}: var(--container-${size})`);
			expect(result.css).toContain(`--container-${size}: ${value}`);
		}
	});
	it('keeps app styles free of competing global tokens and Capsule metrics in the preset', () => {
		for (const path of ['apps/app/src/styles.css', 'apps/ui-storybook/.storybook/tailwind.css']) {
			const css = read(path);
			expect(css).toContain("@import '../../../libs/styles/src/caps-foundations.css'");
			postcss.parse(css).walkDecls((declaration) => {
				expect(declaration.prop).not.toMatch(/^--/);
			});
			expect(css).not.toMatch(/@font-face|@import ['"]@fontsource/);
		}
		const preset = read('libs/caps/caps-preset.css');
		expect(preset).toContain('--caps-control-height');
		expect(preset).toContain('--caps-focus-ring-width');
		expect(preset).not.toMatch(/(?:10px|12px|0\.8rem|opacity-50|ring-3)/);
	});
	it('styles select validation through the shared error matcher rather than pristine aria-invalid', () => {
		const css = postcss.parse(read('libs/caps/caps-preset.css'));
		const rules: string[] = [];
		css.walkRules('.caps-select-trigger', (rule) => {
			rule.walkAtRules('apply', (atRule) => {
				rules.push(atRule.params);
			});
		});
		expect(rules.join(' ')).toContain('data-[matches-spartan-invalid=true]:border-destructive');
		expect(rules.join(' ')).not.toContain('aria-invalid:border-destructive');
		expect(read('libs/caps/caps-preset.css')).toContain(
			".caps-field[data-matches-spartan-invalid='true'] .caps-select-trigger",
		);
	});
});
