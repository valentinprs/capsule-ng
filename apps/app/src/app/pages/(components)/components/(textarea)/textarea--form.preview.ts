import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmLabelImports } from '@spartan-ng/helm/label';

@Component({
	selector: 'spartan-textarea-form',
	imports: [CapsTextareaImports, HlmLabelImports, HlmButtonImports, HlmFieldImports, FormRoot, FormField],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<form [formRoot]="form">
			<hlm-field-group>
				<hlm-field>
					<label hlmFieldLabel for="textarea-bio">Bio</label>
					<textarea
						capsTextarea
						class="w-80"
						id="textarea-bio"
						placeholder="Tell us a little bit about yourself"
						[formField]="form.bio"
					></textarea>
					<p hlmFieldDescription>
						You can
						<span>&#64;mention</span>
						other users and organizations.
					</p>
				</hlm-field>
				<hlm-field orientation="horizontal">
					<button hlmBtn type="submit">Submit</button>
				</hlm-field>
			</hlm-field-group>
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
