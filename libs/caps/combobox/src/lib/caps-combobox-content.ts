import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { BrnComboboxContent, BrnComboboxList, injectBrnComboboxBase } from '@spartan-ng/brain/combobox';
import { classes } from '@spartan-ng/helm/utils';
import { CAPS_COMBOBOX_CONTEXT } from './caps-combobox-context';

/** Floating content owns its listbox; search/status remain outside the listbox. */
@Component({
	selector: 'caps-combobox-content',
	imports: [BrnComboboxList],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnComboboxContent],
	host: {
		'data-slot': 'combobox-content',
		'[attr.dir]': '_context.dir()',
		'[attr.role]': '_base.mode() === "popup" ? "dialog" : null',
		'[attr.aria-label]': '_base.mode() === "popup" ? "Choose an option" : null',
	},
	template: `
		<ng-content select="caps-combobox-input, caps-combobox-empty, caps-combobox-status" />
		<div
			brnComboboxList
			class="caps-combobox-list overflow-y-auto overscroll-contain"
			[aria-label]="ariaLabel()"
			[attr.aria-multiselectable]="_context.multiple ? 'true' : null"
		>
			<ng-content />
		</div>
	`,
})
export class CapsComboboxContent {
	protected readonly _base = injectBrnComboboxBase();
	protected readonly _context = inject(CAPS_COMBOBOX_CONTEXT);
	public readonly ariaLabel = input('Suggestions', { alias: 'aria-label' });
	constructor() {
		classes(
			() =>
				'caps-combobox-content group/combobox-content flex w-(--brn-combobox-width) max-w-[calc(100vw-1rem)] flex-col p-0',
		);
	}
}
