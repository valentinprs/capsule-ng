import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-combobox-form-multiple-preview',
	imports: [CapsComboboxImports, FormRoot, FormField, CapsButton, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full max-w-xs' },
	template: `
		<form [formRoot]="form">
			<caps-field-group>
				<caps-field>
					<caps-field-label>Select frameworks</caps-field-label>
					<caps-combobox-multiple [formField]="form.framework">
						<caps-combobox-chips class="max-w-xs">
							<ng-template capsComboboxValues let-values>
								@for (value of values; track $index) {
									<caps-combobox-chip [value]="value">{{ value }}</caps-combobox-chip>
								}
							</ng-template>

							<input capsComboboxChipInput id="frameworks" />
						</caps-combobox-chips>
						<caps-combobox-content>
							<caps-combobox-empty>No items found.</caps-combobox-empty>

							@for (framework of frameworks; track $index) {
								<caps-combobox-option [value]="framework">{{ framework }}</caps-combobox-option>
							}
						</caps-combobox-content>
					</caps-combobox-multiple>
				</caps-field>
				<div class="flex flex-wrap gap-2">
					<button type="submit" capsButton [disabled]="form().submitting()">Submit</button>
				</div>
			</caps-field-group>
		</form>
	`,
})
export class ComboboxFormMultiplePreview {
	protected readonly _model = signal<{ framework: string[] }>({ framework: ['Analog'] });

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.framework, { message: 'Please select at least one framework' });
			minLength(schemaPath.framework, 1, { message: 'Please select at least one framework' });
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

	public frameworks = ['Analog', 'Angular', 'Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];
}
