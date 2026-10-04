import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
	selector: 'spartan-bug-report-form',
	imports: [
		ReactiveFormsModule,
		CapsCardImports,
		CapsFieldImports,
		CapsInputImports,
		HlmInputGroupImports,
		CapsButtonImports,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Bug Report</caps-card-title>
				<caps-card-description>Help us improve by reporting bugs you encounter.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-bug-report" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="title">Bug Title</caps-field-label>
							<input
								capsInput
								id="title"
								placeholder="Login button not working on mobile"
								autoComplete="off"
								formControlName="title"
							/>
							<caps-field-error validator="required">Title must be entered.</caps-field-error>
							<caps-field-error validator="minlength">Title must be at least 5 characters.</caps-field-error>
							<caps-field-error validator="maxlength">Title cannot exceed 32 characters.</caps-field-error>
						</caps-field>
						<caps-field>
							<caps-field-label for="description">Description</caps-field-label>
							<hlm-input-group>
								<textarea
									hlmInputGroupTextarea
									id="description"
									class="min-h-24"
									placeholder="I'm having an issue with the login button on mobile."
									rows="6"
									formControlName="description"
								></textarea>
								<hlm-input-group-addon align="block-end">
									<span hlmInputGroupText>{{ form.controls.description.value?.length || 0 }}/100 characters</span>
								</hlm-input-group-addon>
							</hlm-input-group>
							<caps-field-description>
								Include steps to reproduce, expected behavior, and what actually happened.
							</caps-field-description>
							<caps-field-error validator="required">Description must be entered.</caps-field-error>
							<caps-field-error validator="minlength">Description must be at least 20 characters.</caps-field-error>
							<caps-field-error validator="maxlength">Description cannot exceed 100 characters.</caps-field-error>
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				<button capsButton type="submit" form="form-bug-report">Submit</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class BugReportForm {
	private readonly _fb = inject(FormBuilder);

	public form = this._fb.group({
		title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(32)]],
		description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]],
	});

	submit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		console.log('You submitted the following values:', JSON.stringify(this.form.value, null, 2));
	}
}

export const demoCode = `
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';

@Component({
	selector: 'spartan-reactive-forms-demo',
	imports: [
		ReactiveFormsModule,
		CapsCardImports,
		CapsFieldImports,
		CapsInputImports,
		HlmInputGroupImports,
		CapsButtonImports,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Bug Report</caps-card-title>
				<caps-card-description>Help us improve by reporting bugs you encounter.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-bug-report" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field>
							<caps-field-label for="title">Bug Title</caps-field-label>
							<input
								capsInput
								id="title"
								placeholder="Login button not working on mobile"
								autoComplete="off"
								formControlName="title"
							/>
							<caps-field-error validator="required">Title must be entered.</caps-field-error>
							<caps-field-error validator="minlength">Title must be at least 5 characters.</caps-field-error>
							<caps-field-error validator="maxlength">Title cannot exceed 32 characters.</caps-field-error>
						</caps-field>
						<caps-field>
							<caps-field-label for="description">Description</caps-field-label>
							<hlm-input-group>
								<textarea
									hlmInputGroupTextarea
									id="description"
									class="min-h-24"
									placeholder="I'm having an issue with the login button on mobile."
									rows="6"
									formControlName="description"
								></textarea>
								<hlm-input-group-addon align="block-end">
									<span hlmInputGroupText>{{ form.controls.description.value?.length || 0 }}/100 characters</span>
								</hlm-input-group-addon>
							</hlm-input-group>
							<caps-field-description>
								Include steps to reproduce, expected behavior, and what actually happened.
							</caps-field-description>
							<caps-field-error validator="required">Description must be entered.</caps-field-error>
							<caps-field-error validator="minlength">Description must be at least 20 characters.</caps-field-error>
							<caps-field-error validator="maxlength">Description cannot exceed 100 characters.</caps-field-error>
						</caps-field>
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
					<button capsButton type="submit" form="form-bug-report">Submit</button>
				</caps-card-footer>
		</caps-card>
	\`,
})
export class ReactiveFormsDemo {
	private readonly _fb = inject(FormBuilder);

	public form = this._fb.group({
		title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(32)]],
		description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]],
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

export const demoAnatomyCode = `
<caps-field>
	<caps-field-label>Bug Title</caps-field-label>
	<input
		capsInput
		id="title"
		placeholder="Login button not working on mobile"
		autoComplete="off"
		formControlName="title"
	/>
	<caps-field-error validator="required">Title is a required field.</caps-field-error>
	<caps-field-error validator="minlength">Title must be at least 5 characters.</caps-field-error>
	<caps-field-error validator="maxlength">Title cannot exceed 32 characters.</caps-field-error>
</caps-field>`;

export const demoForceShowCode = `
<caps-field>
	<caps-field-label for="title">Bug Title</caps-field-label>
	<input capsInput id="title" formControlName="title" />
	<caps-field-error forceShow>This error is always visible.</caps-field-error>
</caps-field>`;

export const demoFormSchemaCode = `
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'bug-report-form',
	imports: [],
	host: { class: 'w-full sm:max-w-md' },
	template: \`...\`,
})
export class BugReportForm {
	private readonly _fb = inject(FormBuilder);

	public form = this._fb.group({
		title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(32)]],
		description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]],
	});
}
`;

export const demoSetupForm = `
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
	selector: 'bug-report-form',
	imports: [ReactiveFormsModule],
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<form [formGroup]="form" (ngSubmit)="submit()">
			<!-- Build the form here -->
		</form>
	\`,
})
export class BugReportForm {
	private readonly _fb = inject(FormBuilder);

	public form = this._fb.group({
		title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(32)]],
		description: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]],
	});

	submit() {
		// Do something with the form values.
		console.log(this.form.value);
	}
}
`;

export const demoResetForm = `
<button capsButton variant="outline" type="button" (click)="form.reset()">
	Reset
</button>
`;
