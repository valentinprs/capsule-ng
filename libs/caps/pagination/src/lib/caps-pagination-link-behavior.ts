import type { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, Directive, forwardRef, input } from '@angular/core';
import { buttonVariants } from '@capsule-ng/caps/button';
import { BrnButton } from '@spartan-ng/brain/button';
import { classes } from '@spartan-ng/helm/utils';

/** @internal Shared native action behavior; use the public pagination directives. */
@Directive({
	providers: [{ provide: BrnButton, useExisting: forwardRef(() => CapsPaginationLinkBehavior) }],
	host: {
		'data-slot': 'pagination-link',
		'[attr.aria-current]': 'isActive() ? "page" : null',
		'[attr.data-active]': 'isActive() || null',
		'[attr.aria-disabled]': '_isAnchor && disabled() ? true : null',
	},
})
export class CapsPaginationLinkBehavior extends BrnButton {
	/** Whether this is the current page, matching Carbon Angular PaginationNavItem. */
	public readonly isActive = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	constructor() {
		super();
		classes(() => [
			'caps-pagination-link',
			buttonVariants({ variant: this.isActive() ? 'outline' : 'ghost', size: 'icon' }),
		]);
	}
}
