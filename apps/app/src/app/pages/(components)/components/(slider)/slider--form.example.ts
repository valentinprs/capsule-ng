import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSliderImports } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-slider-form',
	imports: [CapsSliderImports, FormRoot, FormField, CapsButtonImports, CapsFieldImports],
	host: { class: 'w-full max-w-xs' },
	template: `
		<form [formRoot]="form">
			<caps-field-group>
				<caps-field>
					<caps-field-label>Volume</caps-field-label>
					<caps-slider [formField]="form.volume" />
					<caps-field-description>Set your speaker volume.</caps-field-description>
				</caps-field>
				<div>
					<button capsButton type="submit">Submit</button>
				</div>
			</caps-field-group>
		</form>
	`,
})
export class SliderForm {
	protected readonly _model = signal<{ volume: number[] }>({ volume: [25] });

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.volume, { message: 'Volume is required' });
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
