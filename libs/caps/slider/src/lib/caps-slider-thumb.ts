import { Directive, input } from '@angular/core';
import { BrnSliderThumb } from '@spartan-ng/brain/slider';

/** @internal Private view adapter: keep Brain interactions while owning each thumb's accessible name. */
@Directive({
	selector: 'button[capsSliderThumb]',
	host: {
		'[attr.aria-label]': 'label()',
		'[attr.aria-labelledby]': 'labelledBy()',
		'[attr.aria-describedby]': 'describedBy()',
		'[attr.aria-valuetext]': 'valueText()',
		'[attr.aria-disabled]': '_slider.mutableDisabled() ? "true" : null',
		'[disabled]': '_slider.mutableDisabled()',
		'[attr.aria-invalid]': 'invalid() ? "true" : null',
	},
})
export class CapsSliderThumb extends BrnSliderThumb {
	public readonly label = input<string | null>(null);
	public readonly labelledBy = input<string | null>(null);
	public readonly describedBy = input<string | null>(null);
	public readonly valueText = input<string | null>(null);
	public readonly invalid = input<boolean | null>(null);
}
