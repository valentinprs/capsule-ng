import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * Marks the primary navigation, usually a `caps-navigation-menu`, written once. `caps-header`
 * renders it in the bar from the `md` breakpoint, and in the menu sheet below it.
 */
@Directive({ selector: '[capsHeaderNav]' })
export class CapsHeaderNav {
	/** @internal */
	public readonly template = inject(TemplateRef);
}
