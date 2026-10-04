import { Directive, input } from '@angular/core';
import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { BrnInput } from '@spartan-ng/brain/input';
import { classes } from '@spartan-ng/helm/utils';

/** Native selection and Angular forms remain owned by the actual select element. */
@Directive({
	selector: 'select[capsNativeSelect]',
	hostDirectives: [
		{ directive: BrnInput, inputs: ['id', 'forceInvalid'] },
		{ directive: BrnFieldControlDescribedBy, inputs: ['aria-describedby'] },
	],
	host: { 'data-slot': 'native-select', '[attr.data-size]': 'controlSize()' },
})
export class CapsNativeSelect {
	public readonly controlSize = input<'default' | 'sm'>('default');
	constructor() {
		classes(
			() =>
				'caps-native-select caps-input w-full min-w-0 outline-none disabled:cursor-not-allowed disabled:opacity-(--caps-opacity-disabled)',
		);
	}
}
