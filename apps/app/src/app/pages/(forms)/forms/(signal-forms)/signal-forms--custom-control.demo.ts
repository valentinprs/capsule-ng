import { Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CountryPicker, countryPickerCode } from './custom-control/country-picker';
import { PasswordInput, passwordInputCode } from './custom-control/password-input';

@Component({
	selector: 'spartan-signal-form-custom-control-demo',
	imports: [FormRoot, FormField, CapsCardImports, CapsFieldImports, CapsInputImports, CapsButtonImports, PasswordInput],
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Login to your account</caps-card-title>
				<caps-card-description>Enter your email below to login to your account</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form [formRoot]="form" id="form-custom-control-demo">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="email">Email</caps-field-label>
							<input
								capsInput
								id="email"
								placeholder="spartan@example.com"
								autoComplete="email"
								[formField]="form.email"
							/>

							@for (error of form.email().errors(); track error.kind) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
						<caps-field>
							<caps-field-label for="password">Password</caps-field-label>
							<spartan-password-input inputId="password" [formField]="form.password" />
							@for (error of form.password().errors(); track error.kind) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer>
				<caps-field>
					<button capsButton type="submit" form="form-custom-control-demo">Login</button>
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<caps-field-description class="text-center">
						Don't have an account?
						<a href="#">Sign up</a>
					</caps-field-description>
				</caps-field>
			</caps-card-footer>
		</caps-card>
	`,
})
export class SignalFormCustomControlDemo {
	protected readonly _model = signal({
		email: '',
		password: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.email, { message: 'Email is a required field.' });
			email(schemaPath.email, { message: 'Email must be a valid email address.' });
			required(schemaPath.password, { message: 'Password is a required field.' });
			minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters long.' });
		},
		{
			// triggers the submission flow by calling `submit()` - marks all fields as touched, revealing validation errors
			submission: {
				action: async () => {
					const model = this._model();

					console.log('You submitted the following values:', JSON.stringify(model, null, 2));

					// submit to api
				},
			},
		},
	);

	reset() {
		this.form().reset({
			email: '',
			password: '',
		});
	}
}

export const signalFormsCustomControlDemoCode = `
${passwordInputCode}

// login-form.ts
import { Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { PasswordInput } from './custom-control/password-input';

@Component({
	selector: 'spartan-signal-form-custom-control-demo',
	imports: [FormRoot, FormField, CapsCardImports, CapsFieldImports, CapsInputImports, CapsButtonImports, PasswordInput],
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Login to your account</caps-card-title>
				<caps-card-description>Enter your email below to login to your account</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form [formRoot]="form" id="form-custom-control-demo">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="email">Email</caps-field-label>
							<input
								capsInput
								id="email"
								placeholder="spartan@example.com"
								autoComplete="email"
								[formField]="form.email"
							/>

							@for (error of form.email().errors(); track error.kind) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
						<caps-field>
							<caps-field-label for="password">Password</caps-field-label>
							<spartan-password-input inputId="password" [formField]="form.password" />
							@for (error of form.password().errors(); track error.kind) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer>
				<caps-field>
					<button capsButton type="submit" form="form-custom-control-demo">Login</button>
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<caps-field-description class="text-center">
						Don't have an account?
						<a href="#">Sign up</a>
					</caps-field-description>
				</caps-field>
			</caps-card-footer>
		</caps-card>
	\`,
})
export class SignalFormCustomControlDemo {
	protected readonly _model = signal({
		email: '',
		password: '',
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.email, { message: 'Email is a required field.' });
			email(schemaPath.email, { message: 'Email must be a valid email address.' });
			required(schemaPath.password, { message: 'Password is a required field.' });
			minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters long.' });
		},
		{
			// triggers the submission flow by calling \`submit()\` - marks all fields as touched, revealing validation errors
			submission: {
				action: async () => {
					const model = this._model();

					console.log('You submitted the following values:', JSON.stringify(model, null, 2));

					// submit to api
				},
			},
		},
	);

	reset() {
		this.form().reset({
			email: '',
			password: '',
		});
	}
}
`;

@Component({
	selector: 'spartan-signal-form-country-picker-demo',
	imports: [FormRoot, FormField, CapsCardImports, CapsFieldImports, CapsInputImports, CapsButtonImports, CountryPicker],
	host: { class: 'w-full sm:max-w-sm' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Shipping information</caps-card-title>
				<caps-card-description>Where should we ship your order?</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form [formRoot]="form" id="form-country-picker-demo">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="country">Country</caps-field-label>
							<spartan-country-picker inputId="country" [formField]="form.country" />
							@for (error of form.country().errors(); track error.kind) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer>
				<caps-field>
					<button capsButton type="submit" form="form-country-picker-demo">Submit</button>
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
				</caps-field>
			</caps-card-footer>
		</caps-card>
	`,
})
export class SignalFormCountryPickerDemo {
	protected readonly _model = signal<{ country: string | null }>({
		country: null,
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.country, { message: 'Please select a country.' });
		},
		{
			submission: {
				action: async () => {
					const model = this._model();
					console.log('You submitted the following values:', JSON.stringify(model, null, 2));
				},
			},
		},
	);

	reset() {
		this.form().reset({ country: null });
	}
}

export const signalFormsCountryPickerDemoCode = `
${countryPickerCode}

// shipping-form.ts
import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CountryPicker } from './custom-control/country-picker';

@Component({
	selector: 'app-shipping-form',
	imports: [FormRoot, FormField, CapsCardImports, CapsFieldImports, CapsInputImports, CapsButtonImports, CountryPicker],
	host: { class: 'w-full sm:max-w-sm' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Shipping information</caps-card-title>
				<caps-card-description>Where should we ship your order?</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form [formRoot]="form" id="form-country-picker-demo">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="country">Country</caps-field-label>
							<spartan-country-picker inputId="country" [formField]="form.country" />
							@for (error of form.country().errors(); track error.kind) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer>
				<caps-field>
					<button capsButton type="submit" form="form-country-picker-demo">Submit</button>
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
				</caps-field>
			</caps-card-footer>
		</caps-card>
	\`,
})
export class ShippingForm {
	protected readonly _model = signal<{ country: string | null }>({
		country: null,
	});

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.country, { message: 'Please select a country.' });
		},
		{
			submission: {
				action: async () => {
					const model = this._model();
					console.log('You submitted the following values:', JSON.stringify(model, null, 2));
				},
			},
		},
	);

	reset() {
		this.form().reset({ country: null });
	}
}
`;

export const demoPasswordInputGroupCode = `
<!-- Password field with input group -->
<caps-field>
	<caps-field-label for="password">Password</caps-field-label>
	<caps-input-group>
		<input
			capsInput
			id="password"
			autoComplete="current-password"
			[type]="_inputType()"
			[formField]="form.password" />
		<caps-input-group-addon align="inline-end">
			<button capsButton variant="ghost" type="button" size="icon-xs" (click)="togglePasswordVisibility()">
				<ng-icon [name]="_icon()" />
				<span class="sr-only">Toggle password visibility</span>
			</button>
		</caps-input-group-addon>
	</caps-input-group>
	@for (error of form.password().errors(); track error.kind) {
		<caps-field-error [validator]="error.kind">
			{{ error.message }}
		</caps-field-error>
	}
</caps-field>

// Component logic
protected readonly _inputType = signal<'text' | 'password'>('password');

protected readonly _icon = computed(() => (this._inputType() === 'password' ? 'lucideEye' : 'lucideEyeOff'));

public togglePasswordVisibility() {
	this._inputType.set(this._inputType() === 'password' ? 'text' : 'password');
}
`;
