import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CapsAutocompleteImports } from '@capsule-ng/caps/autocomplete';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-autocomplete-invalid-preview',
	imports: [CapsAutocompleteImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full max-w-xs' },
	template: `
		<caps-field forceInvalid>
			<caps-field-label>Component</caps-field-label>
			<caps-autocomplete [(search)]="search">
				<caps-autocomplete-input forceInvalid placeholder="Search components" />
				<caps-autocomplete-content>
					<caps-autocomplete-empty>No components found.</caps-autocomplete-empty>

					@for (option of filteredOptions(); track $index) {
						<caps-autocomplete-option [value]="option">
							{{ option }}
						</caps-autocomplete-option>
					}
				</caps-autocomplete-content>
			</caps-autocomplete>
			<caps-field-error>Please select a component.</caps-field-error>
		</caps-field>
	`,
})
export class AutocompleteInvalidPreview {
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
