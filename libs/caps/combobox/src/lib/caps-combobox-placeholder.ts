import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnComboboxPlaceholder } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-combobox-placeholder',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnComboboxPlaceholder],
	host: { 'data-slot': 'combobox-placeholder' },
	template: '<ng-content />',
})
export class CapsComboboxPlaceholder {
	constructor() {
		classes(
			() =>
				'caps-combobox-placeholder flex items-center data-hidden:hidden [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0',
		);
	}
}
