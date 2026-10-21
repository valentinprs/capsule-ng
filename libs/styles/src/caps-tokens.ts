/// <reference types="vite/client" />
import capsTokensCss from './caps-tokens.css?raw';

/** Source of `caps-tokens.css`, shown verbatim by the docs so its values are never duplicated. */
export const CAPS_TOKENS_CSS: string = capsTokensCss;

/** shadcn tokens that alias a `--caps-*` token of the same name (`--primary: var(--caps-primary)`). */
export const SHADCN_ALIASED_TOKENS = [
	'background',
	'foreground',
	'card',
	'card-foreground',
	'popover',
	'popover-foreground',
	'primary',
	'primary-foreground',
	'secondary',
	'secondary-foreground',
	'muted',
	'muted-foreground',
	'accent',
	'accent-foreground',
	'destructive',
	'border',
	'ring',
	'sidebar',
	'sidebar-foreground',
	'sidebar-accent',
	'sidebar-accent-foreground',
	'sidebar-border',
	'sidebar-ring',
	'chart-1',
	'chart-2',
	'chart-3',
	'chart-4',
	'chart-5',
	'surface',
] as const;

/** Accent colors, each with a subtle and a strong background/foreground pair and a border. */
export const CAPS_ACCENT_COLORS = [
	'red',
	'magenta',
	'purple',
	'blue',
	'cyan',
	'orange',
	'yellow',
	'green',
	'cool-gray',
] as const;

/** Accent tokens (`--caps-background-accent-red-subtle`…), flattened from the Figma `…/accent/…` variables. */
export const CAPS_ACCENT_TOKENS = CAPS_ACCENT_COLORS.flatMap(
	(color) =>
		[
			`background-accent-${color}-subtle`,
			`foreground-accent-${color}-subtle`,
			`border-accent-${color}`,
			`background-accent-${color}-strong`,
			`foreground-accent-${color}-strong`,
		] as const,
);

/**
 * Alpha tokens (`--caps-alpha-black-switch-5`…), flattened from the Figma `alpha/…` variables: the steps
 * used by the Figma components. `switch` scales swap black and white in dark mode.
 */
export const CAPS_ALPHA_TOKENS = [
	...['333', '5', '10', '15', '20', '30', '40', '100'].map((step) => `alpha-black-switch-${step}` as const),
	'alpha-black-no-switch-25',
	...['001', '30', '50', '70', '75', '80', '85', '90', '95', '100'].map(
		(step) => `alpha-white-switch-${step}` as const,
	),
	'alpha-white-outline-bg',
] as const;

/** Every `--caps-*` color token, defined for light (`:root`) and dark (`.dark`) in `caps-tokens.css`. */
export const CAPS_COLOR_TOKENS = [
	...SHADCN_ALIASED_TOKENS,
	// The field background; the shadcn `--input` is the field border and aliases `--caps-border`.
	'input',
	'ring-error',
	...CAPS_ALPHA_TOKENS,
	...CAPS_ACCENT_TOKENS,
] as const;
