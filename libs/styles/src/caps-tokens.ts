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
	'input',
	'ring',
	'sidebar',
	'sidebar-foreground',
	'sidebar-primary',
	'sidebar-primary-foreground',
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
	'surface-foreground',
] as const;

/** Every `--caps-*` color token, defined for light (`:root`) and dark (`.dark`) in `caps-tokens.css`. */
export const CAPS_COLOR_TOKENS = [...SHADCN_ALIASED_TOKENS, 'ring-error'] as const;
export type CapsColorToken = (typeof CAPS_COLOR_TOKENS)[number];
