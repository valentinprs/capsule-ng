import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
	selector: 'spartan-input-form',
	imports: [CapsInputImports, HlmButtonImports, CapsFieldImports, FormRoot, FormField],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<form [formRoot]="form">
			<caps-field-group>
				<caps-field>
					<caps-field-label for="form-name">Name</caps-field-label>
					<input capsInput type="text" id="form-name" placeholder="Leonidas" [formField]="form.name" />
				</caps-field>
				<caps-field>
					<caps-field-label for="form-email">Email</caps-field-label>
					<input capsInput type="email" id="form-email" placeholder="leonidas@example.com" [formField]="form.email" />
					<caps-field-description>We'll never share your email with anyone.</caps-field-description>
				</caps-field>
				<caps-field>
					<caps-field-label for="form-address">Address</caps-field-label>
					<input capsInput type="text" id="form-address" placeholder="123 Main St" [formField]="form.address" />
				</caps-field>
				<caps-field orientation="horizontal">
					<button hlmBtn variant="outline" type="button" (click)="reset()">Cancel</button>
					<button hlmBtn type="submit">Submit</button>
				</caps-field>
			</caps-field-group>
		</form>
	`,
})
export class InputFormPreview {
	protected readonly _model = signal({
		name: '',
		email: '',
		address: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.name, { message: 'Name is required' });
			required(schemaPath.email, { message: 'Email is required' });
			email(schemaPath.email, { message: 'Enter a valid email address' });
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

	public reset() {
		this.form().reset({
			name: '',
			email: '',
			address: '',
		});
	}
}
