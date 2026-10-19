import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';
import { CAPS_ACCENT_COLORS, CAPS_COLOR_TOKENS, CAPS_TOKENS_CSS, SHADCN_ALIASED_TOKENS } from './caps-tokens';

const stylesheet = readFileSync(new URL('./caps-tokens.css', import.meta.url), 'utf8');

const palette = Object.fromEntries(
	[
		...readFileSync(createRequire(import.meta.url).resolve('tailwindcss/theme.css'), 'utf8').matchAll(
			/(--color-[\w-]+):\s*([^;]+);/g,
		),
	].map(([, name, value]) => [
		name,
		value.replace(/oklch\(([\d.]+)%/, (_, lightness: string) => `oklch(${Number(lightness) / 100}`),
	]),
);
const resolvePalette = (value: string) =>
	value.replace(/^var\((--color-[\w-]+)\)$/, (_, name: string) =>
		name === '--color-white' ? 'oklch(1 0 0)' : name === '--color-black' ? 'oklch(0 0 0)' : palette[name],
	);

const declarations = (selector: string) => {
	const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const block = stylesheet.match(new RegExp(`(?:^|\\n)${escaped}\\s*\\{([^}]*)\\}`))?.[1];
	expect(block, `${selector} block is missing`).toBeDefined();
	return Object.fromEntries(
		[...(block ?? '').matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [
			name,
			resolvePalette(value.trim()),
		]),
	);
};

const blue = {
	300: 'oklch(0.809 0.105 251.813)',
	500: 'oklch(0.623 0.214 259.815)',
	600: 'oklch(0.546 0.245 262.881)',
	700: 'oklch(0.488 0.243 264.376)',
	800: 'oklch(0.424 0.199 265.638)',
};

describe('caps color tokens', () => {
	const light = declarations(':root');
	const dark = declarations('.dark');

	it('exposes the stylesheet source for the docs', () => {
		expect(CAPS_TOKENS_CSS).toBe(stylesheet);
	});

	for (const [mode, tokens] of [
		['light', light],
		['dark', dark],
	] as const) {
		it(`defines every caps color token in ${mode} mode and nothing else`, () => {
			expect(
				Object.keys(tokens)
					.filter((name) => name.startsWith('--caps-'))
					.sort(),
			).toEqual(CAPS_COLOR_TOKENS.map((token) => `--caps-${token}`).sort());
		});

		it(`uses the Figma blue scale for the charts in ${mode} mode`, () => {
			expect([1, 2, 3, 4, 5].map((n) => tokens[`--caps-chart-${n}`])).toEqual([
				blue[300],
				blue[500],
				blue[600],
				blue[700],
				blue[800],
			]);
		});
	}

	it('keeps the shadcn neutral values', () => {
		expect(light['--caps-background']).toBe('oklch(1 0 0)');
		expect(light['--caps-foreground']).toBe('oklch(0.145 0 0)');
		expect(light['--caps-primary']).toBe('oklch(0.205 0 0)');
		expect(light['--caps-ring']).toBe('oklch(0.708 0 0)');
		expect(light['--caps-surface-foreground']).toBe('var(--caps-foreground)');
		expect(dark['--caps-border']).toBe('oklch(1 0 0 / 10%)');
		expect(dark['--caps-sidebar-border']).toBe('oklch(1 0 0 / 10%)');
		expect(dark['--caps-input']).toBe('oklch(1 0 0 / 15%)');
	});

	it('defines ring-error as red-200 in light mode and red-900 in dark mode', () => {
		expect(light['--caps-ring-error']).toBe('oklch(0.885 0.062 18.334)');
		expect(dark['--caps-ring-error']).toBe('oklch(0.396 0.141 25.723)');
	});

	it('maps the accent tokens to the Figma palette steps', () => {
		const families: Record<(typeof CAPS_ACCENT_COLORS)[number], string> = {
			red: 'red',
			magenta: 'pink',
			purple: 'purple',
			blue: 'blue',
			cyan: 'cyan',
			orange: 'orange',
			yellow: 'yellow',
			green: 'green',
			'cool-gray': 'slate',
		};
		const steps = {
			light: {
				'background-#-subtle': 100,
				'foreground-#-subtle': 700,
				'border-#': 500,
				'background-#-strong': 700,
				'foreground-#-strong': 50,
			},
			dark: {
				'background-#-subtle': 950,
				'foreground-#-subtle': 200,
				'border-#': 900,
				'background-#-strong': 200,
				'foreground-#-strong': 950,
			},
		};
		for (const [mode, tokens] of [
			['light', light],
			['dark', dark],
		] as const) {
			for (const color of CAPS_ACCENT_COLORS) {
				for (const [token, step] of Object.entries(steps[mode])) {
					const name = `--caps-${token.replace('#', `accent-${color}`)}`;
					expect(tokens[name], `${mode} ${name}`).toBe(palette[`--color-${families[color]}-${step}`]);
				}
			}
		}
	});

	it('aliases every shadcn token to its caps token in both modes', () => {
		const aliases = declarations(':root,\n.dark');
		expect(aliases).toEqual(
			Object.fromEntries(SHADCN_ALIASED_TOKENS.map((token) => [`--${token}`, `var(--caps-${token})`])),
		);
	});

	it('exposes the caps-only colors to Tailwind', () => {
		const theme = declarations('@theme inline');
		expect(theme).toEqual({
			'--color-ring-error': 'var(--caps-ring-error)',
			'--color-surface': 'var(--surface)',
			'--color-surface-foreground': 'var(--surface-foreground)',
		});
	});
});
