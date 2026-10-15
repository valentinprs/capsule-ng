import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnAutocompleteStatus } from '@spartan-ng/brain/autocomplete';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-autocomplete-status',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnAutocompleteStatus],
	host: { 'data-slot': 'autocomplete-status' },
	template: '<ng-content />',
})
export class CapsAutocompleteStatus {
	constructor() {
		classes(() => 'caps-autocomplete-status flex w-full items-center justify-center text-center');
	}
}
