import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';

@Component({
	selector: 'spartan-radio-group-form',
	imports: [CapsRadioGroupImports, CapsLabelImports, CapsButtonImports, FormRoot, FormField],
	template: `
		<form class="space-y-6" [formRoot]="form">
			<div class="flex flex-col gap-3">
				<label capsLabel id="subscription-plan-label">Subscription Plan</label>
				<caps-radio-group aria-labelledby="subscription-plan-label" [formField]="form.plan">
					<div class="flex items-center gap-3">
						<caps-radio value="monthly" id="monthly"></caps-radio>
						<label capsLabel for="monthly">Monthly ($9.99/month)</label>
					</div>
					<div class="flex items-center gap-3">
						<caps-radio value="yearly" id="yearly"></caps-radio>
						<label capsLabel for="yearly">Yearly ($99.99/year)</label>
					</div>
					<div class="flex items-center gap-3">
						<caps-radio value="lifetime" id="lifetime"></caps-radio>
						<label capsLabel for="lifetime">Lifetime ($299.99)</label>
					</div>
				</caps-radio-group>
			</div>
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
