import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnComboboxLabel } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-combobox-label',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnComboboxLabel, inputs: ['id'] }],
	host: { 'data-slot': 'combobox-label' },
	template: '<ng-content />',
})
export class CapsComboboxLabel {
	constructor() {
		classes(() => 'caps-combobox-label');
	}
}
