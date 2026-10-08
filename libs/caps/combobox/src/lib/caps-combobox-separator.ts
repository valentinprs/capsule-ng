import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnComboboxSeparator } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-combobox-separator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnComboboxSeparator, inputs: ['orientation'] }],
	// Listbox separators divide visual groups without adding an unsupported accessible child.
	host: { 'data-slot': 'combobox-separator', 'aria-hidden': 'true' },
	template: '<ng-content />',
})
export class CapsComboboxSeparator {
	constructor() {
		classes(() => 'caps-combobox-separator');
	}
}
