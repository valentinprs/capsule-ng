import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnAutocompleteGroup } from '@spartan-ng/brain/autocomplete';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-autocomplete-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnAutocompleteGroup],
	host: { 'data-slot': 'autocomplete-group' },
	template: '<ng-content />',
})
export class CapsAutocompleteGroup {
	constructor() {
		classes(() => 'data-hidden:hidden');
	}
}
