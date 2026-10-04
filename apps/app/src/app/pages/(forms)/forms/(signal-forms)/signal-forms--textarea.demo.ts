import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, maxLength, minLength, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-signal-form-textarea-demo',
	imports: [FormField, CapsCardImports, CapsFieldImports, CapsTextareaImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Personalization</caps-card-title>
				<caps-card-description>Customize your experience by telling us more about yourself.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form novalidate id="form-textarea-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="about">More about you</caps-field-label>
							<textarea
								capsTextarea
								id="about"
								class="min-h-32"
								placeholder="I'm a software engineer..."
								[formField]="form.about"
							></textarea>
							<caps-field-description>
								Tell us more about yourself. This will be used to help us personalize your experience.
							</caps-field-description>
							@for (error of form.about().errors(); track error) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
				<button capsButton type="submit" form="form-textarea-demo">Submit</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class SignalFormTextareaDemo {
	protected readonly _model = signal({
		about: '',
	});

	public readonly form = form(this._model, (schemaPath) => {
		required(schemaPath.about, { message: 'This is a required field.' });
		minLength(schemaPath.about, 10, { message: 'Please provide at least 10 characters.' });
		maxLength(schemaPath.about, 200, { message: 'Please keep it under 200 characters.' });
	});

	async submit(event: Event) {
		event.preventDefault();

		// marks all fields as touched, revealing validation errors
		submit(this.form, async () => {
			const model = this._model();

			console.log('You submitted the following values:', JSON.stringify(model, null, 2));
		});
	}

	reset() {
		this.form().reset({
			about: '',
		});
	}
}

export const signalFormsTextareaDemoCode = `
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, maxLength, minLength, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-signal-form-textarea-demo',
	imports: [FormField, CapsCardImports, CapsFieldImports, CapsTextareaImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Personalization</caps-card-title>
				<caps-card-description>Customize your experience by telling us more about yourself.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form novalidate id="form-textarea-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="about">More about you</caps-field-label>
							<textarea
								capsTextarea
								id="about"
								class="min-h-32"
								placeholder="I'm a software engineer..."
								[formField]="form.about"
							></textarea>
							<caps-field-description>
								Tell us more about yourself. This will be used to help us personalize your experience.
							</caps-field-description>
							@for (error of form.about().errors(); track error) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-textarea-demo">Submit</button>
				</caps-card-footer>
		</caps-card>
	\`,
})
export class SignalFormTextareaDemo {
	protected readonly _model = signal({
		about: '',
	});

	public readonly form = form(this._model, (schemaPath) => {
		required(schemaPath.about, { message: 'This is a required field.' });
		minLength(schemaPath.about, 10, { message: 'Please provide at least 10 characters.' });
		maxLength(schemaPath.about, 200, { message: 'Please keep it under 200 characters.' });
	});

	async submit(event: Event) {
		event.preventDefault();

		// marks all fields as touched, revealing validation errors
		submit(this.form, async () => {
			const model = this._model();

			console.log('You submitted the following values:', JSON.stringify(model, null, 2));
		});
	}

	reset() {
		this.form().reset({
			about: '',
		});
	}
}
`;
