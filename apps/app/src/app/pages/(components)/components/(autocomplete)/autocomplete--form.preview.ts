import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsAutocompleteImports } from '@capsule-ng/caps/autocomplete';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';

interface SpartanComponent {
	id: string;
	value: string;
}

@Component({
	selector: 'spartan-autocomplete-form-preview',
	imports: [CapsAutocompleteImports, FormRoot, FormField, CapsButton, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<form [formRoot]="form">
			<caps-field-group>
				<caps-field>
					<caps-field-label>Select a component</caps-field-label>
					<caps-autocomplete [formField]="form.component" [(search)]="search">
						<caps-autocomplete-input placeholder="e.g. Accordion" />
						<caps-autocomplete-content>
							<caps-autocomplete-empty>No components found.</caps-autocomplete-empty>

							@for (component of filteredOptions(); track $index) {
								<caps-autocomplete-option [value]="component">
									{{ component.value }}
								</caps-autocomplete-option>
							}
						</caps-autocomplete-content>
					</caps-autocomplete>
				</caps-field>
				<div class="flex flex-wrap gap-2">
					<button type="submit" capsButton [disabled]="form().submitting()">Submit</button>
				</div>
			</caps-field-group>
		</form>
	`,
})
export class AutocompleteFormPreview {
	protected readonly _model = signal<{ component: SpartanComponent | null }>({ component: null });

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.component, { message: 'Please select a component' });
		},
		{
			submission: {
				action: async () => {
					const model = this._model();
					console.log(model);
				},
			},
		},
	);

	private readonly _components: SpartanComponent[] = [
		{ id: 'accordion', value: 'Accordion' },
		{ id: 'alert-dialog', value: 'Alert dialog' },
		{ id: 'autocomplete', value: 'Autocomplete' },
		{ id: 'avatar', value: 'Avatar' },
		{ id: 'checkbox', value: 'Checkbox' },
		{ id: 'collapsible', value: 'Collapsible' },
		{ id: 'combobox', value: 'Combobox' },
		{ id: 'command', value: 'Command' },
		{ id: 'context-menu', value: 'Context menu' },
		{ id: 'data-table', value: 'Data table' },
		{ id: 'date-picker', value: 'Date picker' },
		{ id: 'dialog', value: 'Dialog' },
		{ id: 'field', value: 'Field' },
		{ id: 'input', value: 'Input' },
		{ id: 'menubar', value: 'Menubar' },
		{ id: 'navigation-menu', value: 'Navigation menu' },
		{ id: 'popover', value: 'Popover' },
		{ id: 'progress', value: 'Progress' },
		{ id: 'radio', value: 'Radio' },
		{ id: 'scroll-area', value: 'Scroll area' },
		{ id: 'select', value: 'Select' },
		{ id: 'separator', value: 'Separator' },
		{ id: 'skeleton', value: 'Skeleton' },
		{ id: 'slider', value: 'Slider' },
		{ id: 'sonner', value: 'Sonner' },
		{ id: 'spinner', value: 'Spinner' },
		{ id: 'switch', value: 'Switch' },
		{ id: 'table', value: 'Table' },
		{ id: 'tabs', value: 'Tabs' },
		{ id: 'textarea', value: 'Textarea' },
		{ id: 'toggle', value: 'Toggle' },
		{ id: 'toggle-group', value: 'Toggle group' },
		{ id: 'tooltip', value: 'Tooltip' },
	];

	public readonly search = signal('');

	public readonly filteredOptions = computed(() =>
		this._components.filter((component) => component.value.toLowerCase().includes(this.search().toLowerCase())),
	);
}
