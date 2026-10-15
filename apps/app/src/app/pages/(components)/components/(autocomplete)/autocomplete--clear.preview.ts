import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CapsAutocompleteImports } from '@capsule-ng/caps/autocomplete';

@Component({
	selector: 'spartan-autocomplete-clear-preview',
	imports: [CapsAutocompleteImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-autocomplete [(search)]="search">
			<caps-autocomplete-input placeholder="Search components" showClear />
			<caps-autocomplete-content>
				<caps-autocomplete-empty>No components found.</caps-autocomplete-empty>

				@for (option of filteredOptions(); track $index) {
					<caps-autocomplete-option [value]="option">
						{{ option }}
					</caps-autocomplete-option>
				}
			</caps-autocomplete-content>
		</caps-autocomplete>
	`,
})
export class AutocompleteClearPreview {
	private readonly _options: string[] = [
		'Accordion',
		'Alert dialog',
		'Autocomplete',
		'Avatar',
		'Checkbox',
		'Collapsible',
		'Combobox',
		'Command',
		'Context menu',
		'Data table',
		'Date picker',
		'Dialog',
		'Field',
		'Input',
		'Menubar',
		'Navigation menu',
		'Popover',
		'Progress',
		'Radio',
		'Scroll area',
		'Select',
		'Separator',
		'Skeleton',
		'Slider',
		'Sonner',
		'Spinner',
		'Switch',
		'Table',
		'Tabs',
		'Textarea',
		'Toast',
		'Toggle',
		'Tooltip',
	];

	public readonly search = signal('');

	public readonly filteredOptions = computed(() =>
		this._options.filter((option) => option.toLowerCase().includes(this.search().toLowerCase())),
	);
}
