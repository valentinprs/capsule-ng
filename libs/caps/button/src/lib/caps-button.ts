import { Directive, input } from '@angular/core';
import { BrnButton } from '@spartan-ng/brain/button';
import { classes } from '@spartan-ng/helm/utils';
import { buttonVariants, type CapsButtonSize, type CapsButtonVariant } from './caps-button.variants';

/**
 * Button directive for a native `<button>`, built on brain's `BrnButton` (`disabled` input,
 * `data-disabled`). Focus, keyboard activation and `type` stay native. Minimal for now (pilot):
 * `default`/`ghost` variants, `default`/`icon` sizes.
 */
@Directive({
	selector: 'button[capsButton]',
	hostDirectives: [{ directive: BrnButton, inputs: ['disabled'] }],
	host: { 'data-slot': 'button' },
})
export class CapsButton {
	public readonly variant = input<CapsButtonVariant | undefined>('default');

	public readonly size = input<CapsButtonSize | undefined>('default');

	constructor() {
		classes(() => buttonVariants({ variant: this.variant(), size: this.size() }));
	}
}
