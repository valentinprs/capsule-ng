import { ChangeDetectionStrategy, Component, forwardRef, inject, input } from '@angular/core';
import {
	BrnPopover,
	BrnPopoverContent,
	provideBrnPopoverConfig,
	provideBrnPopoverDefaultOptions,
} from '@spartan-ng/brain/popover';
import { classes } from '@spartan-ng/helm/utils';
import { CAPS_AUTOCOMPLETE_CONTEXT } from './caps-autocomplete-context';
import { CapsAutocompleteSearchBehavior } from './caps-autocomplete-search-behavior';

@Component({
	selector: 'caps-autocomplete-search',
	imports: [BrnPopoverContent],
	providers: [
		{ provide: CAPS_AUTOCOMPLETE_CONTEXT, useExisting: forwardRef(() => CapsAutocompleteSearch) },
		provideBrnPopoverConfig({
			align: 'start',
			sideOffset: 6,
		}),
		provideBrnPopoverDefaultOptions({ role: null }),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: CapsAutocompleteSearchBehavior,
			inputs: ['autoHighlight', 'disabled', 'value', 'search', 'itemToString'],
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
export class CapsAutocompleteSearch {
	public readonly dir = input<'ltr' | 'rtl' | 'auto'>('auto');
	protected readonly _brain = inject(CapsAutocompleteSearchBehavior);
	constructor() {
		classes(() => 'caps-autocomplete block min-w-0');
	}
}
