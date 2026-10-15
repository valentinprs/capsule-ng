import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnAutocompleteSeparator } from '@spartan-ng/brain/autocomplete';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-autocomplete-separator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnAutocompleteSeparator, inputs: ['orientation'] }],
	// Listbox separators divide visual groups without adding an unsupported accessible child.
	host: { 'data-slot': 'autocomplete-separator', 'aria-hidden': 'true' },
	template: '<ng-content />',
})
export class CapsAutocompleteSeparator {
	constructor() {
		classes(() => 'caps-autocomplete-separator');
	}
}
