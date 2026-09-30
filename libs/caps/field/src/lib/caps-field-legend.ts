import { Directive, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: 'legend[capsFieldLegend]',
	host: { 'data-slot': 'field-legend', '[attr.data-variant]': 'variant()' },
})
export class CapsFieldLegend {
	/** Uses heading-sized text by default; label uses field-label sizing. */
	public readonly variant = input<'legend' | 'label'>('legend');
	constructor() {
		classes(() => 'caps-field-legend');
	}
}
