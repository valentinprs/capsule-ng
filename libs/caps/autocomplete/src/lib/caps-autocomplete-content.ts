import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { BrnAutocompleteContent, BrnAutocompleteList } from '@spartan-ng/brain/autocomplete';
import { classes } from '@spartan-ng/helm/utils';
import { CAPS_AUTOCOMPLETE_CONTEXT } from './caps-autocomplete-context';

/** Floating content owns its listbox; search/status remain outside the listbox. */
@Component({
	selector: 'caps-autocomplete-content',
	imports: [BrnAutocompleteList],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnAutocompleteContent],
	host: { 'data-slot': 'autocomplete-content', '[attr.dir]': '_context.dir()' },
	template: `
		<ng-content select="caps-autocomplete-input, caps-autocomplete-empty, caps-autocomplete-status" />
		<div
			brnAutocompleteList
			class="caps-autocomplete-list overflow-y-auto overscroll-contain"
			[aria-label]="ariaLabel()"
		>
			<ng-content />
		</div>
	`,
})
export class CapsAutocompleteContent {
	protected readonly _context = inject(CAPS_AUTOCOMPLETE_CONTEXT);
	public readonly ariaLabel = input('Suggestions', { alias: 'aria-label' });
	constructor() {
		classes(
			() =>
				'caps-autocomplete-content group/autocomplete-content flex w-(--brn-autocomplete-width) max-w-[calc(100vw-1rem)] flex-col p-0',
		);
	}
}
