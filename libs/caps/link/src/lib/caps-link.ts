import { computed, Directive, inject } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { CAPS_LINK_CONTEXT } from './caps-link.token';

export const linkVariants = cva('caps-link', {
	variants: {
		variant: {
			default: 'caps-link-variant-default',
			breadcrumb: 'caps-link-variant-breadcrumb',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export type LinkVariants = VariantProps<typeof linkVariants>;

/**
 * Styling-only link directive. It has no router dependency: add `href` or `routerLink` yourself.
 * Inside a component that provides `CAPS_LINK_CONTEXT` (e.g. a breadcrumb item) it uses that
 * context's variant and sets `aria-current="page"` when the context is current.
 */
@Directive({
	selector: 'a[capsLink]',
	host: {
		'data-slot': 'link',
		'[attr.aria-current]': '_ariaCurrent()',
	},
})
export class CapsLink {
	private readonly _context = inject(CAPS_LINK_CONTEXT, { optional: true });

	protected readonly _ariaCurrent = computed(() => (this._context?.isCurrent() ? 'page' : null));

	constructor() {
		classes(() => linkVariants({ variant: this._context?.variant ?? 'default' }));
	}
}
