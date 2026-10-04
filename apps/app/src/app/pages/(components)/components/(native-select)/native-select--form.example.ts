import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsNativeSelectImports } from '@capsule-ng/caps/native-select';
@Component({
	selector: 'spartan-native-select-form-example',
	imports: [FormRoot, FormField, CapsNativeSelectImports, CapsFieldImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<form [formRoot]="form">
			<caps-field-group>
				<caps-field>
					<caps-field-label>Favorite Fruit</caps-field-label>
					<select capsNativeSelect id="fruit" [formField]="form.fruit">
						<option value="">Select a fruit</option>
						<option value="apple">Apple</option>
						<option value="banana">Banana</option>
						<option value="blueberry">Blueberry</option>
					</select>
				</caps-field>
				<button capsButton type="submit" [disabled]="form().submitting()">Submit</button>
			</caps-field-group>
		</form>
	`,
})
export class NativeSelectFormExample {
	protected readonly _model = signal<{ fruit: string }>({ fruit: '' });

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
}
