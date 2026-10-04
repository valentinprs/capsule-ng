import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-reactive-form-input-demo',
	imports: [ReactiveFormsModule, CapsCardImports, CapsFieldImports, CapsInputImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Profile Settings</caps-card-title>
				<caps-card-description>Update your profile information below.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-input-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="username">Username</caps-field-label>
							<input capsInput id="username" placeholder="spartan" autoComplete="username" formControlName="username" />
							<caps-field-description>
								This is your public display name. Must be between 3 and 10 characters. Must only contain letters,
								numbers, and underscores.
							</caps-field-description>
							<caps-field-error validator="required">Username is a required field.</caps-field-error>
							<caps-field-error validator="minlength">Username must be at least 3 characters.</caps-field-error>
							<caps-field-error validator="maxlength">Username must be at most 10 characters.</caps-field-error>
							<caps-field-error validator="pattern">
								Username can only contain letters, numbers, and underscores.
							</caps-field-error>
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				<button capsButton type="submit" form="form-input-demo">Submit</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class ReactiveFormInputDemo {
	private readonly _fb = inject(FormBuilder);

	public form = this._fb.group({
		username: [
			'',
			[Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9_]+$/)],
		],
	});

	submit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		console.log('You submitted the following values:', JSON.stringify(this.form.value, null, 2));
	}
}

export const reactiveFormsInputDemoCode = `
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-reactive-form-input-demo',
	imports: [ReactiveFormsModule, CapsCardImports, CapsFieldImports, CapsInputImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Profile Settings</caps-card-title>
				<caps-card-description>Update your profile information below.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-input-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="username">Username</caps-field-label>
							<input capsInput id="username" placeholder="spartan" autoComplete="username" formControlName="username" />
							<caps-field-description>
								This is your public display name. Must be between 3 and 10 characters. Must only contain letters,
								numbers, and underscores.
							</caps-field-description>
							<caps-field-error validator="required">Username is a required field.</caps-field-error>
							<caps-field-error validator="minlength">Username must be at least 3 characters.</caps-field-error>
							<caps-field-error validator="maxlength">Username must be at most 10 characters.</caps-field-error>
							<caps-field-error validator="pattern">
								Username can only contain letters, numbers, and underscores.
							</caps-field-error>
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
					<button capsButton type="submit" form="form-input-demo">Submit</button>
				</caps-card-footer>
		</caps-card>
	\`,
})
export class ReactiveFormInputDemo {
	private readonly _fb = inject(FormBuilder);

	public form = this._fb.group({
		username: [
			'',
			[Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9_]+$/)],
		],
	});

	submit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		console.log('You submitted the following values:', JSON.stringify(this.form.value, null, 2));
	}
}
`;
