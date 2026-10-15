import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { BrnAutocompleteItem } from '@spartan-ng/brain/autocomplete';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-autocomplete-option',
	imports: [NgIcon],
	providers: [provideIcons({ lucideCheck })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnAutocompleteItem, inputs: ['id', 'disabled', 'value'] }],
	host: { 'data-slot': 'autocomplete-item' },
	template: `
		<ng-content />
		@if (_active()) {
			<ng-icon name="lucideCheck" class="caps-autocomplete-option-indicator" aria-hidden="true" />
		}
	`,
})
export class CapsAutocompleteOption {
	private readonly _brnAutocompleteItem = inject(BrnAutocompleteItem);

	protected readonly _active = this._brnAutocompleteItem.active;

	constructor() {
		classes(
			() =>
				'caps-autocomplete-option relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-hidden:hidden [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0',
		);
	}
}
