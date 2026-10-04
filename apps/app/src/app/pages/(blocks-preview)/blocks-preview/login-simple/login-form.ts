import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-simple-login-form',
	imports: [FormRoot, FormField, RouterLink, CapsCardImports, CapsFieldImports, CapsInputImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Login to your account</caps-card-title>
				<caps-card-description>Enter your email below to login to your account</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form [formRoot]="form">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="email">Email</caps-field-label>
							<input capsInput type="email" id="email" placeholder="m@example.com" [formField]="form.email" />
							@for (error of form.email().errors(); track error) {
								<caps-field-error [validator]="error.kind">{{ error.message }}</caps-field-error>
							}
						</caps-field>
						<caps-field>
							<div class="flex items-center">
								<caps-field-label for="password">Password</caps-field-label>
								<caps-field-description>
									<a class="ml-auto text-sm underline-offset-4 hover:underline" routerLink=".">Forgot password?</a>
								</caps-field-description>
							</div>
							<input capsInput type="password" id="password" [formField]="form.password" />
							@for (error of form.password().errors(); track error) {
								<caps-field-error [validator]="error.kind">{{ error.message }}</caps-field-error>
							}
						</caps-field>
						<div class="flex flex-col gap-3">
							<button capsButton type="submit" [disabled]="form().submitting()">Login</button>
							<button capsButton variant="outline" type="button">Login with Google</button>
							<p class="text-muted-foreground text-center text-sm">
								Don't have an account?
								<a routerLink=".">Sign up</a>
							</p>
						</div>
					</caps-field-group>
				</form>
			</caps-card-content>
		</caps-card>
	`,
})
export class LoginForm {
	protected readonly _model = signal({
		email: '',
		password: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.email, { message: 'Email is required.' });
			email(schemaPath.email, { message: 'Enter a valid email address.' });
			required(schemaPath.password, { message: 'Password is required.' });
			minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters long.' });
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
