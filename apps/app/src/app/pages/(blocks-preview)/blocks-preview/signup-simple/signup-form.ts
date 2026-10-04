import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-simple-signup-form',
	imports: [FormRoot, FormField, RouterLink, CapsCardImports, CapsFieldImports, CapsInputImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Create an account</caps-card-title>
				<caps-card-description>Enter your information below to create your account</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form [formRoot]="form">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="name">Full Name</caps-field-label>
							<input capsInput type="text" id="name" placeholder="John Doe" [formField]="form.name" />
							@for (error of form.name().errors(); track error) {
								<caps-field-error [validator]="error.kind">{{ error.message }}</caps-field-error>
							}
						</caps-field>
						<caps-field>
							<caps-field-label for="email">Email</caps-field-label>
							<input capsInput type="email" id="email" placeholder="you@example.com" [formField]="form.email" />
							@if (!(form.email().touched() && form.email().invalid())) {
								<caps-field-description>
									We'll use this to contact you. We will not share your email with anyone else.
								</caps-field-description>
							}
							@for (error of form.email().errors(); track error) {
								<caps-field-error [validator]="error.kind">{{ error.message }}</caps-field-error>
							}
						</caps-field>
						<caps-field>
							<caps-field-label for="password">Password</caps-field-label>
							<input capsInput type="password" id="password" [formField]="form.password" />
							@if (!(form.password().touched() && form.password().invalid())) {
								<caps-field-description>Must be at least 8 characters long.</caps-field-description>
							}
							@for (error of form.password().errors(); track error) {
								<caps-field-error [validator]="error.kind">{{ error.message }}</caps-field-error>
							}
						</caps-field>
						<caps-field>
							<caps-field-label for="confirmPassword">Confirm Password</caps-field-label>
							<input capsInput type="password" id="confirmPassword" [formField]="form.confirmPassword" />
							@if (!(form.confirmPassword().touched() && form.confirmPassword().invalid())) {
								<caps-field-description>Please confirm your password.</caps-field-description>
							}
							@if (form.confirmPassword().touched() && form.confirmPassword().invalid()) {
								@for (error of form.confirmPassword().errors(); track error) {
									<caps-field-error [validator]="error.kind">{{ error.message }}</caps-field-error>
								}
							}
						</caps-field>
						<div class="flex flex-col gap-3">
							<button capsButton type="submit" [disabled]="form().submitting()">Create Account</button>
							<button capsButton variant="outline" type="button">Sign up with Google</button>
							<p class="text-muted-foreground text-center text-sm">
								Already have an account?
								<a routerLink=".">Sign in</a>
							</p>
						</div>
					</caps-field-group>
				</form>
			</caps-card-content>
		</caps-card>
	`,
})
export class SignupForm {
	protected readonly _model = signal({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.name, { message: 'Name is required.' });
			required(schemaPath.email, { message: 'Email is required.' });
			email(schemaPath.email, { message: 'Enter a valid email address.' });
			required(schemaPath.password, { message: 'Password is required.' });
			minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters long.' });
			required(schemaPath.confirmPassword, { message: 'Confirming your password is required.' });

			validate(schemaPath.confirmPassword, ({ value, valueOf, stateOf }) => {
				if (value() === '') return null;
				if (!stateOf(schemaPath.password).touched()) return null;
				if (value() !== valueOf(schemaPath.password)) {
					return {
						kind: 'passwordMismatch',
						message: 'Passwords must match.',
					};
				}
				return null;
			});
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
