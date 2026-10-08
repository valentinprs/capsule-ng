import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnAutocompleteLabel } from '@spartan-ng/brain/autocomplete';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-autocomplete-label',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnAutocompleteLabel, inputs: ['id'] }],
	host: { 'data-slot': 'autocomplete-label' },
	template: '<ng-content />',
})
export class CapsAutocompleteLabel {
	constructor() {
		classes(() => 'caps-autocomplete-label');
	}
}
