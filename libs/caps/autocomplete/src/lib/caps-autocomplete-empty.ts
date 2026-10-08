import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnAutocompleteEmpty } from '@spartan-ng/brain/autocomplete';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-autocomplete-empty',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnAutocompleteEmpty],
	host: { 'data-slot': 'autocomplete-empty' },
	template: '<ng-content />',
})
export class CapsAutocompleteEmpty {
	constructor() {
		classes(() => 'caps-autocomplete-empty');
	}
}
