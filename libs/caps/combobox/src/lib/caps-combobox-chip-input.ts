import { Directive, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BrnComboboxChipInput, injectBrnComboboxBase } from '@spartan-ng/brain/combobox';
import { BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { classes } from '@spartan-ng/helm/utils';

@Directive({
	selector: 'input[capsComboboxChipInput]',
	hostDirectives: [
		{ directive: BrnComboboxChipInput, inputs: ['id', 'aria-invalid'] },
		{ directive: BrnFieldControlDescribedBy, inputs: ['aria-describedby'] },
	],
	host: {
		'data-slot': 'combobox-chip-input',
		'[attr.aria-controls]': '_base.isExpanded() ? _base.listId() : null',
		'[attr.aria-activedescendant]': '_base.isExpanded() ? _active() : null',
	},
})
export class CapsComboboxChipInput {
	protected readonly _base = injectBrnComboboxBase();
	protected readonly _active = signal<string | undefined>(undefined);

	constructor() {
		this._base.keyManager.change
			.pipe(takeUntilDestroyed())
			.subscribe(() => this._active.set(this._base.keyManager.activeItem?.id()));
		classes(() => 'caps-combobox-chip-input min-w-16 flex-1 outline-none');
	}
}
