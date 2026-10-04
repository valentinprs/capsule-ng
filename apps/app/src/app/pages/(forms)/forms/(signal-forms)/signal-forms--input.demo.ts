import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, maxLength, minLength, pattern, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-signal-form-input-demo',
	imports: [FormField, CapsCardImports, CapsFieldImports, CapsInputImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Profile Settings</caps-card-title>
				<caps-card-description>Update your profile information below.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form novalidate id="form-input-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="username">Username</caps-field-label>
							<input
								capsInput
								id="username"
								placeholder="spartan"
								autoComplete="username"
								[formField]="form.username"
							/>
							<caps-field-description>
								This is your public display name. Must be between 3 and 10 characters. Must only contain letters,
								numbers, and underscores.
							</caps-field-description>
							@for (error of form.username().errors(); track error) {
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
				<button capsButton type="submit" form="form-input-demo">Submit</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class SignalFormInputDemo {
	protected readonly _model = signal({
		username: '',
	});

	public readonly form = form(this._model, (schemaPath) => {
		required(schemaPath.username, { message: 'Username is a required field.' });
		minLength(schemaPath.username, 3, { message: 'Username must be at least 3 characters.' });
		maxLength(schemaPath.username, 10, { message: 'Username must be at most 10 characters.' });
		pattern(schemaPath.username, /^[a-zA-Z0-9_]+$/, {
			message: 'Username can only contain letters, numbers, and underscores.',
		});
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
			username: '',
		});
	}
}

export const signalFormsInputDemoCode = `
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, maxLength, minLength, pattern, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-signal-form-input-demo',
	imports: [FormField, CapsCardImports, CapsFieldImports, CapsInputImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Profile Settings</caps-card-title>
				<caps-card-description>Update your profile information below.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form novalidate id="form-input-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="username">Username</caps-field-label>
							<input capsInput id="username" placeholder="spartan" autoComplete="username" [formField]="form.username" />
							<caps-field-description>
								This is your public display name. Must be between 3 and 10 characters. Must only contain letters,
								numbers, and underscores.
							</caps-field-description>
							@for (error of form.username().errors(); track error) {
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
					<button capsButton type="submit" form="form-input-demo">Submit</button>
				</caps-card-footer>
		</caps-card>
	\`,
})
export class SignalFormInputDemo {
	protected readonly _model = signal({
		username: '',
	});

	public readonly form = form(this._model, (schemaPath) => {
		required(schemaPath.username, { message: 'Username is a required field.' });
		minLength(schemaPath.username, 3, { message: 'Username must be at least 3 characters.' });
		maxLength(schemaPath.username, 10, { message: 'Username must be at most 10 characters.' });
		pattern(schemaPath.username, /^[a-zA-Z0-9_]+$/, {
			message: 'Username can only contain letters, numbers, and underscores.',
		});
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
			username: '',
		});
	}
}
`;
