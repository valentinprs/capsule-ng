import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-reactive-form-textarea-demo',
	imports: [ReactiveFormsModule, CapsCardImports, CapsFieldImports, CapsTextareaImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Personalization</caps-card-title>
				<caps-card-description>Customize your experience by telling us more about yourself.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-textarea-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="about">More about you</caps-field-label>
							<textarea
								capsTextarea
								id="about"
								class="min-h-32"
								placeholder="I'm a software engineer..."
								formControlName="about"
							></textarea>
							<caps-field-description>
								Tell us more about yourself. This will be used to help us personalize your experience.
							</caps-field-description>
							<caps-field-error validator="required">This is a required field.</caps-field-error>
							<caps-field-error validator="minlength">Please provide at least 10 characters.</caps-field-error>
							<caps-field-error validator="maxlength">Please keep it under 200 characters.</caps-field-error>
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				<button capsButton type="submit" form="form-textarea-demo">Submit</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class ReactiveFormTextareaDemo {
	private readonly _fb = inject(FormBuilder);

	public form = this._fb.group({
		about: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
	});

	submit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		console.log('You submitted the following values:', JSON.stringify(this.form.value, null, 2));
	}
}

export const reactiveFormsTextareaDemoCode = `
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-reactive-form-textarea-demo',
	imports: [ReactiveFormsModule, CapsCardImports, CapsFieldImports, CapsTextareaImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Personalization</caps-card-title>
				<caps-card-description>Customize your experience by telling us more about yourself.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-textarea-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="about">More about you</caps-field-label>
							<textarea
								capsTextarea
								id="about"
								class="min-h-32"
								placeholder="I'm a software engineer..."
								formControlName="about"
							></textarea>
							<caps-field-description>
								Tell us more about yourself. This will be used to help us personalize your experience.
							</caps-field-description>
							<caps-field-error validator="required">This is a required field.</caps-field-error>
							<caps-field-error validator="minlength">Please provide at least 10 characters.</caps-field-error>
							<caps-field-error validator="maxlength">Please keep it under 200 characters.</caps-field-error>
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
					<button capsButton type="submit" form="form-textarea-demo">Submit</button>
				</caps-card-footer>
		</caps-card>
	\`,
})
export class ReactiveFormTextareaDemo {
	private readonly _fb = inject(FormBuilder);

	public form = this._fb.group({
		about: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
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
