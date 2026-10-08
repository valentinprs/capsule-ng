import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnComboboxValue } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-combobox-value',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnComboboxValue, inputs: ['placeholder'] }],
	host: { 'data-slot': 'combobox-value' },
	template: '<ng-content />',
})
export class CapsComboboxValue {
	constructor() {
		classes(() => 'data-hidden:hidden');
	}
}
