import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
	selector: 'spartan-reactive-form-radio-group-demo',
	imports: [ReactiveFormsModule, HlmCardImports, CapsFieldImports, CapsRadioGroupImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Subscription Plan</h3>
				<p hlmCardDescription>See pricing and features for each plan.</p>
			</hlm-card-header>
			<div hlmCardContent>
				<form id="form-radio-group-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field-set>
							<caps-field-legend>Plan</caps-field-legend>
							<caps-field-description>You can upgrade or downgrade your plan at any time.</caps-field-description>
							<caps-radio-group formControlName="plan">
								@for (plan of plans; track plan.id) {
									<caps-field-label [for]="'plan-' + plan.id">
										<caps-field orientation="horizontal">
											<caps-field-content>
												<span class="font-medium">{{ plan.title }}</span>
												<caps-field-description>{{ plan.description }}</caps-field-description>
											</caps-field-content>
											<caps-radio [value]="plan.id" [id]="'plan-' + plan.id"></caps-radio>
										</caps-field>
									</caps-field-label>
								}
							</caps-radio-group>
						</caps-field-set>
						@if (form.controls.plan.invalid && form.controls.plan.touched) {
							<caps-field-error>You must select a subscription plan to continue.</caps-field-error>
						}
					</caps-field-group>
				</form>
			</div>
			<hlm-card-footer>
				<caps-field orientation="horizontal">
					<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
					<button capsButton type="submit" form="form-radio-group-demo">Submit</button>
				</caps-field>
			</hlm-card-footer>
		</hlm-card>
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
import { HlmCardImports } from '@spartan-ng/helm/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';

@Component({
	selector: 'spartan-reactive-form-radio-group-demo',
	imports: [ReactiveFormsModule, HlmCardImports, CapsFieldImports, CapsRadioGroupImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Subscription Plan</h3>
				<p hlmCardDescription>See pricing and features for each plan.</p>
			</hlm-card-header>
			<div hlmCardContent>
				<form id="form-radio-group-demo" [formGroup]="form" (ngSubmit)="submit()">
					<caps-field-group>
						<caps-field-set>
							<caps-field-legend>Plan</caps-field-legend>
							<caps-field-description>You can upgrade or downgrade your plan at any time.</caps-field-description>
							<caps-radio-group formControlName="plan">
								@for (plan of plans; track plan.id) {
									<caps-field-label [for]="'plan-' + plan.id">
										<caps-field orientation="horizontal">
											<caps-field-content>
												<span class="font-medium">{{ plan.title }}</span>
												<caps-field-description>{{ plan.description }}</caps-field-description>
											</caps-field-content>
											<caps-radio [value]="plan.id" [id]="'plan-' + plan.id">
											</caps-radio>
										</caps-field>
									</caps-field-label>
								}
							</caps-radio-group>
						</caps-field-set>
						@if (form.controls.plan.invalid && form.controls.plan.touched) {
							<caps-field-error>You must select a subscription plan to continue.</caps-field-error>
						}
					</caps-field-group>
				</form>
			</div>
			<hlm-card-footer>
				<caps-field orientation="horizontal">
					<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
					<button capsButton type="submit" form="form-radio-group-demo">Submit</button>
				</caps-field>
			</hlm-card-footer>
		</hlm-card>
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
