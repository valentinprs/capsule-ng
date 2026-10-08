import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnComboboxStatus } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-combobox-status',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnComboboxStatus],
	host: { 'data-slot': 'combobox-status' },
	template: '<ng-content />',
})
export class CapsComboboxStatus {
	constructor() {
		classes(() => 'caps-combobox-status flex w-full items-center justify-center text-center');
	}
}
