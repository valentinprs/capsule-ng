import { ChangeDetectionStrategy, Component, forwardRef, inject, input } from '@angular/core';
import {
	BrnPopover,
	BrnPopoverContent,
	provideBrnPopoverConfig,
	provideBrnPopoverDefaultOptions,
} from '@spartan-ng/brain/popover';
import { classes } from '@spartan-ng/helm/utils';
import { CapsAutocompleteBehavior } from './caps-autocomplete-behavior';
import { CAPS_AUTOCOMPLETE_CONTEXT } from './caps-autocomplete-context';

@Component({
	selector: 'caps-autocomplete',
	imports: [BrnPopoverContent],
	providers: [
		{ provide: CAPS_AUTOCOMPLETE_CONTEXT, useExisting: forwardRef(() => CapsAutocomplete) },
		provideBrnPopoverConfig({
			align: 'start',
			sideOffset: 6,
		}),
		provideBrnPopoverDefaultOptions({ role: null }),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: CapsAutocompleteBehavior,
			inputs: ['autoHighlight', 'disabled', 'value', 'search', 'itemToString', 'isItemEqualToValue'],
			outputs: ['valueChange', 'searchChange'],
		},
		{
			directive: BrnPopover,
			inputs: ['align', 'closeOnOutsidePointerEvents', 'sideOffset', 'state', 'offsetX', 'scrollStrategy'],
			outputs: ['stateChanged', 'closed'],
		},
	],
	host: { 'data-slot': 'autocomplete', '[attr.dir]': 'dir()' },
	template: `
		<ng-content select=":not(caps-autocomplete-content)" />
		<ng-template brnPopoverContent>
			<ng-content select="caps-autocomplete-content" />
		</ng-template>
	`,
})
export class CapsAutocomplete {
	public readonly dir = input<'ltr' | 'rtl' | 'auto'>('auto');
	protected readonly _brain = inject(CapsAutocompleteBehavior);
	constructor() {
		classes(() => 'caps-autocomplete block min-w-0');
	}
}
