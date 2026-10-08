import { ChangeDetectionStrategy, Component, forwardRef, inject, input } from '@angular/core';
import {
	BrnPopover,
	BrnPopoverContent,
	provideBrnPopoverConfig,
	provideBrnPopoverDefaultOptions,
} from '@spartan-ng/brain/popover';
import { classes } from '@spartan-ng/helm/utils';
import { CapsComboboxBehavior } from './caps-combobox-behavior';
import { CAPS_COMBOBOX_CONTEXT } from './caps-combobox-context';

@Component({
	selector: 'caps-combobox',
	imports: [BrnPopoverContent],
	providers: [
		{ provide: CAPS_COMBOBOX_CONTEXT, useExisting: forwardRef(() => CapsCombobox) },
		provideBrnPopoverConfig({
			align: 'start',
			sideOffset: 6,
		}),
		provideBrnPopoverDefaultOptions({ role: null }),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: CapsComboboxBehavior,
			inputs: [
				'autoHighlight',
				'closeOnSelect',
				'disabled',
				'filter',
				'search',
				'value',
				'itemToString',
				'filterOptions',
				'isItemEqualToValue',
			],
			outputs: ['searchChange', 'valueChange'],
		},
		{
			directive: BrnPopover,
			inputs: ['align', 'closeOnOutsidePointerEvents', 'sideOffset', 'state', 'offsetX', 'scrollStrategy'],
			outputs: ['stateChanged', 'closed'],
		},
	],
	host: { 'data-slot': 'combobox', '[attr.dir]': 'dir()' },
	template: `
		<ng-content select=":not(caps-combobox-content)" />
		<ng-template brnPopoverContent>
			<ng-content select="caps-combobox-content" />
		</ng-template>
	`,
})
export class CapsCombobox {
	public readonly dir = input<'ltr' | 'rtl' | 'auto'>('auto');
	protected readonly _brain = inject(CapsComboboxBehavior);
	constructor() {
		classes(() => 'caps-combobox block min-w-0');
	}
}
