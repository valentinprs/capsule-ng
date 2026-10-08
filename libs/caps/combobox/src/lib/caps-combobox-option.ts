import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { BrnComboboxItem } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-combobox-option',
	imports: [NgIcon],
	providers: [provideIcons({ lucideCheck })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnComboboxItem, inputs: ['id', 'disabled', 'value'] }],
	host: { 'data-slot': 'combobox-item', '[hidden]': '!_visible()' },
	template: `
		<ng-content />
		@if (_active()) {
			<ng-icon name="lucideCheck" class="caps-combobox-option-indicator" aria-hidden="true" />
		}
	`,
})
export class CapsComboboxOption {
	private readonly _brnComboboxItem = inject(BrnComboboxItem);

	protected readonly _visible = this._brnComboboxItem.visible;
	protected readonly _active = this._brnComboboxItem.active;

	constructor() {
		classes(
			() =>
				'caps-combobox-option relative flex w-full cursor-default items-center outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-hidden:hidden [&_ng-icon]:pointer-events-none [&_ng-icon]:shrink-0',
		);
	}
}
