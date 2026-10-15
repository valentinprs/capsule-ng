import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnComboboxGroup } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-combobox-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnComboboxGroup],
	host: { 'data-slot': 'combobox-group' },
	template: '<ng-content />',
})
export class CapsComboboxGroup {
	constructor() {
		classes(() => 'data-hidden:hidden');
	}
}
