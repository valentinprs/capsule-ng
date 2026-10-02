import { Directive, HOST_TAG_NAME, inject, input } from '@angular/core';
import { BrnButton } from '@spartan-ng/brain/button';
import { classes } from '@spartan-ng/helm/utils';
import { buttonVariants, type CapsButtonSize, type CapsButtonVariant } from './caps-button.variants';

/**
 * Button styling for native `<button>` and `<a>` elements. Brain supplies disabled behavior;
 * focus, activation, button type and link navigation keep their native semantics.
 * Disabled anchors expose `aria-disabled`, leave the tab order and prevent navigation.
 */
@Directive({
	selector: 'button[capsButton], a[capsButton]',
	hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
	host: {
		'data-slot': 'button',
		'[attr.aria-disabled]': '_isAnchor && _button.disabled() ? true : null',
	},
})
export class CapsButton {
	protected readonly _isAnchor = inject(HOST_TAG_NAME) === 'a';
	protected readonly _button = inject(BrnButton);

	public readonly variant = input<CapsButtonVariant | undefined>('default');

	public readonly size = input<CapsButtonSize | undefined>('default');

	constructor() {
		classes(() => buttonVariants({ variant: this.variant(), size: this.size() }));
	}
}
