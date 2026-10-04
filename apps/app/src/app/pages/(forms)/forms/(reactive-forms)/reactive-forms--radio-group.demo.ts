import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';

@Component({
	selector: 'spartan-reactive-form-radio-group-demo',
	imports: [ReactiveFormsModule, CapsCardImports, CapsFieldImports, HlmRadioGroupImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Subscription Plan</caps-card-title>
				<caps-card-description>See pricing and features for each plan.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-radio-group-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field-set>
							<caps-field-legend>Plan</caps-field-legend>
							<caps-field-description>You can upgrade or downgrade your plan at any time.</caps-field-description>
							<hlm-radio-group formControlName="plan">
								@for (plan of plans; track plan.id) {
									<caps-field-label [for]="'plan-' + plan.id">
										<caps-field orientation="horizontal">
											<caps-field-content>
												<span class="font-medium">{{ plan.title }}</span>
												<caps-field-description>{{ plan.description }}</caps-field-description>
											</caps-field-content>
											<hlm-radio [value]="plan.id" [inputId]="'plan-' + plan.id">
												<hlm-radio-indicator indicator />
											</hlm-radio>
										</caps-field>
									</caps-field-label>
								}
							</hlm-radio-group>
						</caps-field-set>
						@if (form.controls.plan.invalid && form.controls.plan.touched) {
							<caps-field-error>You must select a subscription plan to continue.</caps-field-error>
						}
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				<button capsButton type="submit" form="form-radio-group-demo">Submit</button>
			</caps-card-footer>
		</caps-card>
	`,
})
export class ReactiveFormRadioGroupDemo {
	private readonly _fb = inject(FormBuilder);

	public plans = [
		{
			id: 'starter',
			title: 'Starter (100K tokens/month)',
			description: 'For everyday use with basic features.',
		},
		{
			id: 'pro',
			title: 'Pro (1M tokens/month)',
			description: 'For advanced AI usage with more features.',
		},
		{
			id: 'enterprise',
			title: 'Enterprise (Unlimited tokens)',
			description: 'For large teams and heavy usage.',
		},
	];

	public form = this._fb.group({
		plan: ['', Validators.required],
	});

	submit() {
		if (this.form.invalid) {
			this.form.markAllAsTouched();
			return;
		}

		console.log('You submitted the following values:', JSON.stringify(this.form.value, null, 2));
	}
}

export const reactiveFormsRadioGroupDemoCode = `
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';

@Component({
	selector: 'spartan-reactive-form-radio-group-demo',
	imports: [ReactiveFormsModule, CapsCardImports, CapsFieldImports, HlmRadioGroupImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Subscription Plan</caps-card-title>
				<caps-card-description>See pricing and features for each plan.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form id="form-radio-group-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field-set>
							<caps-field-legend>Plan</caps-field-legend>
							<caps-field-description>You can upgrade or downgrade your plan at any time.</caps-field-description>
							<hlm-radio-group formControlName="plan">
								@for (plan of plans; track plan.id) {
									<caps-field-label [for]="'plan-' + plan.id">
										<caps-field orientation="horizontal">
											<caps-field-content>
												<span class="font-medium">{{ plan.title }}</span>
												<caps-field-description>{{ plan.description }}</caps-field-description>
											</caps-field-content>
											<hlm-radio [value]="plan.id" [inputId]="'plan-' + plan.id">
												<hlm-radio-indicator indicator />
											</hlm-radio>
										</caps-field>
									</caps-field-label>
								}
							</hlm-radio-group>
						</caps-field-set>
						@if (form.controls.plan.invalid && form.controls.plan.touched) {
							<caps-field-error>You must select a subscription plan to continue.</caps-field-error>
						}
					</caps-field-group>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
					<button capsButton type="submit" form="form-radio-group-demo">Submit</button>
				</caps-card-footer>
		</caps-card>
	\`,
})
export class ReactiveFormRadioGroupDemo {
	private readonly _fb = inject(FormBuilder);

	public plans = [
		{
			id: 'starter',
			title: 'Starter (100K tokens/month)',
			description: 'For everyday use with basic features.',
		},
		{
			id: 'pro',
			title: 'Pro (1M tokens/month)',
			description: 'For advanced AI usage with more features.',
		},
		{
			id: 'enterprise',
			title: 'Enterprise (Unlimited tokens)',
			description: 'For large teams and heavy usage.',
		},
	];

	public form = this._fb.group({
		plan: ['', Validators.required],
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
