import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnComboboxEmpty } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-combobox-empty',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnComboboxEmpty],
	host: { 'data-slot': 'combobox-empty' },
	template: '<ng-content />',
})
export class CapsComboboxEmpty {
	constructor() {
		classes(() => 'caps-combobox-empty');
	}
}
