import type { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, computed, Directive, ElementRef, inject, input } from '@angular/core';
import { CAPS_LINK_CONTEXT, CapsLink } from '@capsule-ng/caps/link';
import { BrnNavigationMenuItem, BrnNavigationMenuLink } from '@spartan-ng/brain/navigation-menu';
import { classes } from '@spartan-ng/helm/utils';

/** Native destination with the public Spartan active contract and CapsLink styling. */
@Directive({
	selector: 'a[capsNavigationMenuLink]',
	providers: [
		{
			provide: CAPS_LINK_CONTEXT,
			useFactory: () => {
				const link = inject(BrnNavigationMenuLink);
				const item = inject(BrnNavigationMenuItem);
				const element = inject<ElementRef<HTMLAnchorElement>>(ElementRef);
				const isDirectDestination = element.nativeElement.parentElement === item.el.nativeElement;
				// Match Brain's public active input and item fallback so CapsLink's ARIA binding agrees.
				return {
					variant: 'breadcrumb',
					isCurrent: computed(() => link.active() ?? (isDirectDestination && item.isActive())),
				};
			},
		},
	],
	hostDirectives: [{ directive: BrnNavigationMenuLink, inputs: ['active'] }, CapsLink],
	host: {
		'data-slot': 'navigation-menu-link',
		'[attr.aria-disabled]': 'disabled() || null',
	},
})
export class CapsNavigationMenuLink {
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	constructor() {
		classes(() => 'caps-navigation-menu-link flex items-center gap-1.5');
	}
}
