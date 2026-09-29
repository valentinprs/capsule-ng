import { Directive, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { buttonVariants, type CapsButtonSize, type CapsButtonVariant } from './caps-button.variants';

/**
 * Styling-only button directive for a native `<button>`: focus, keyboard activation, `type` and
 * `disabled` stay native. Minimal for now (pilot): `default`/`ghost` variants, `default`/`icon` sizes.
 */
@Directive({
	selector: 'button[capsButton]',
	host: { 'data-slot': 'button' },
})
export class CapsButton {
	public readonly variant = input<CapsButtonVariant | undefined>('default');

	public readonly size = input<CapsButtonSize | undefined>('default');

	constructor() {
		classes(() => buttonVariants({ variant: this.variant(), size: this.size() }));
	}
}
