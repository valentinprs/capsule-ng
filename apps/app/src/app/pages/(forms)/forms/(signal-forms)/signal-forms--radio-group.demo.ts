import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
	selector: 'spartan-signal-form-radio-group-demo',
	imports: [FormField, HlmCardImports, CapsFieldImports, CapsRadioGroupImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Subscription Plan</h3>
				<p hlmCardDescription>See pricing and features for each plan.</p>
			</hlm-card-header>
			<div hlmCardContent>
				<form novalidate id="form-radio-demo" (submit)="submit($event)">
					<caps-field-set>
						<caps-field-legend>Plan</caps-field-legend>
						<caps-field-description>You can upgrade or downgrade your plan at any time.</caps-field-description>
						<caps-radio-group [formField]="form.plan">
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

						@if (form.plan().invalid() && form.plan().touched()) {
							@for (error of form.plan().errors(); track error) {
								<caps-field-error>
									{{ error.message }}
								</caps-field-error>
							}
						}
					</caps-field-set>
				</form>
			</div>
			<hlm-card-footer>
				<caps-field orientation="horizontal">
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-radio-demo">Submit</button>
				</caps-field>
			</hlm-card-footer>
		</hlm-card>
	`,
})
export class SignalFormRadioGroupDemo {
	protected readonly _model = signal({
		plan: '',
	});

	public readonly form = form(this._model, (schemaPath) => {
		required(schemaPath.plan, { message: 'You must select a subscription plan to continue.' });
	});

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
			plan: '',
		});
	}
}

export const signalFormsRadioGroupDemoCode = `
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';

@Component({
	selector: 'spartan-signal-form-radio-group-demo',
	imports: [FormField, HlmCardImports, CapsFieldImports, CapsRadioGroupImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<hlm-card>
			<hlm-card-header>
				<h3 hlmCardTitle>Subscription Plan</h3>
				<p hlmCardDescription>See pricing and features for each plan.</p>
			</hlm-card-header>
			<div hlmCardContent>
				<form novalidate id="form-radio-demo" (submit)="submit($event)">
					<caps-field-set>
						<caps-field-legend>Plan</caps-field-legend>
						<caps-field-description>You can upgrade or downgrade your plan at any time.</caps-field-description>
						<caps-radio-group [formField]="form.plan">
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

						@if (form.plan().invalid() && form.plan().touched()) {
							@for (error of form.plan().errors(); track error) {
								<caps-field-error>
									{{ error.message }}
								</caps-field-error>
							}
						}
					</caps-field-set>
				</form>
			</div>
			<hlm-card-footer>
				<caps-field orientation="horizontal">
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-radio-demo">Submit</button>
				</caps-field>
			</hlm-card-footer>
		</hlm-card>
	\`,
})
export class SignalFormRadioGroupDemo {
	protected readonly _model = signal({
		plan: '',
	});

	public readonly form = form(this._model, (schemaPath) => {
		required(schemaPath.plan, { message: 'You must select a subscription plan to continue.' });
	});

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
			plan: '',
		});
	}
}
`;
