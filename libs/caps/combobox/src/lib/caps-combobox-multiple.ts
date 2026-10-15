import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import {
	BrnPopover,
	BrnPopoverContent,
	provideBrnPopoverConfig,
	provideBrnPopoverDefaultOptions,
} from '@spartan-ng/brain/popover';
import { classes } from '@spartan-ng/helm/utils';
import { CAPS_COMBOBOX_CONTEXT } from './caps-combobox-context';
import { CapsComboboxMultipleBehavior } from './caps-combobox-multiple-behavior';

@Component({
	selector: 'caps-combobox-multiple',
	imports: [BrnPopoverContent],
	providers: [
		{ provide: CAPS_COMBOBOX_CONTEXT, useFactory: () => ({ dir: inject(CapsComboboxMultiple).dir, multiple: true }) },
		provideBrnPopoverConfig({
			align: 'start',
			sideOffset: 6,
		}),
		provideBrnPopoverDefaultOptions({ role: null }),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: CapsComboboxMultipleBehavior,
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
export class CapsComboboxMultiple {
	public readonly dir = input<'ltr' | 'rtl' | 'auto'>('auto');
	protected readonly _brain = inject(CapsComboboxMultipleBehavior);
	constructor() {
		classes(() => 'caps-combobox block min-w-0');
	}
}
