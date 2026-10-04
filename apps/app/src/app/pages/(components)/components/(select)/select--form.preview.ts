import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSelectImports } from '@capsule-ng/caps/select';
@Component({
	selector: 'spartan-select-form-preview',
	imports: [CapsFieldImports, CapsSelectImports, CapsButtonImports, FormRoot, FormField],
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<form [formRoot]="form">
			<caps-field-group>
				<caps-field>
					<caps-field-label>Fruit</caps-field-label>
					<caps-select
						[formField]="form.fruit"
						[itemToString]="itemToString"
						placeholder="Select a fruit"
						id="fruit"
						class="w-56"
					>
						<caps-select-group label="Fruits">
							@for (item of items; track item.value) {
								<caps-select-option [value]="item.value">{{ item.label }}</caps-select-option>
							}
						</caps-select-group>
					</caps-select>
				</caps-field>
				<button type="submit" capsButton>Submit</button>
			</caps-field-group>
		</form>
	`,
})
export class SelectFormPreview {
	protected readonly _model = signal<{ fruit: string | null }>({ fruit: null });

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.fruit, { message: 'Please select a fruit' });
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

	public readonly items = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Blueberry', value: 'blueberry' },
		{ label: 'Grapes', value: 'grapes' },
		{ label: 'Pineapple', value: 'pineapple' },
	];
	public readonly itemToString = (value: string) => this.items.find((item) => item.value === value)?.label || '';
}
