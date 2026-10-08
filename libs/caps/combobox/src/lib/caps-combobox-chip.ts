import type { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';
import { BrnComboboxChip, injectBrnComboboxBase } from '@spartan-ng/brain/combobox';
import { stringifyAsLabel } from '@spartan-ng/brain/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsComboboxChipRemove } from './caps-combobox-chip-remove';

@Component({
	selector: 'caps-combobox-chip',
	imports: [NgIcon, CapsComboboxChipRemove],
	providers: [provideIcons({ lucideX })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnComboboxChip, inputs: ['value'] }],
	host: { 'data-slot': 'combobox-chip' },
	template: `
		<ng-content />

		@if (showRemove()) {
			<button capsComboboxChipRemove [attr.aria-label]="'Remove ' + _label()">
				<ng-icon aria-hidden="true" name="lucideX" />
			</button>
		}
	`,
})
export class CapsComboboxChip {
	private readonly _chip = inject(BrnComboboxChip);
	private readonly _base = injectBrnComboboxBase();
	protected _label(): string {
		const value = this._chip.value();
		return stringifyAsLabel(value, this._base.itemToString());
	}

	public readonly showRemove = input<boolean, BooleanInput>(true, { transform: booleanAttribute });

	constructor() {
		classes(
			() =>
				'caps-combobox-chip has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50',
		);
	}
}
