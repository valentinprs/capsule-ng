import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
	selector: 'spartan-textarea-form',
	imports: [CapsTextareaImports, HlmButtonImports, CapsFieldImports, FormRoot, FormField],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<form [formRoot]="form">
			<caps-field-group>
				<caps-field>
					<label capsLabel for="textarea-bio">Bio</label>
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
					<button hlmBtn type="submit">Submit</button>
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
