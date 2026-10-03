import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';

@Component({
	selector: 'spartan-radio-group-form',
	imports: [CapsRadioGroupImports, CapsFieldImports, CapsButtonImports, FormRoot, FormField],
	template: `
		<form class="space-y-6" [formRoot]="form">
			<caps-field>
				<caps-field-label>Subscription Plan</caps-field-label>
				<caps-radio-group [formField]="form.plan">
					<caps-radio value="monthly">Monthly ($9.99/month)</caps-radio>
					<caps-radio value="yearly">Yearly ($99.99/year)</caps-radio>
					<caps-radio value="lifetime">Lifetime ($299.99)</caps-radio>
				</caps-radio-group>
			</caps-field>
			<button capsButton type="submit">Submit</button>
		</form>
	`,
})
export class RadioGroupFormPreview {
	protected readonly _model = signal({
		plan: 'monthly',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.plan, { message: 'Please select a plan' });
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
