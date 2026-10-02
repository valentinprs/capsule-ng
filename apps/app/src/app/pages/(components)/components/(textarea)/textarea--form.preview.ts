import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-textarea-form',
	imports: [CapsTextareaImports, CapsButtonImports, CapsFieldImports, FormRoot, FormField],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<form [formRoot]="form">
			<caps-field-group>
				<caps-field>
					<caps-field-label for="textarea-bio">Bio</caps-field-label>
					<textarea
						capsTextarea
						class="w-80"
						id="textarea-bio"
						placeholder="Tell us a little bit about yourself"
						[formField]="form.bio"
					></textarea>
					<caps-field-description>
						You can
						<span>&#64;mention</span>
						other users and organizations.
					</caps-field-description>
				</caps-field>
				<caps-field orientation="horizontal">
					<button capsButton type="submit">Submit</button>
				</caps-field>
			</caps-field-group>
		</form>
	`,
})
export class TextareaFormPreview {
	protected readonly _model = signal({
		bio: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.bio, { message: 'Bio is required' });
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
