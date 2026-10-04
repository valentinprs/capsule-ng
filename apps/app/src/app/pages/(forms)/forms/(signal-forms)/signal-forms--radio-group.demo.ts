import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';

@Component({
	selector: 'spartan-signal-form-radio-group-demo',
	imports: [FormField, CapsCardImports, CapsFieldImports, HlmRadioGroupImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Subscription Plan</caps-card-title>
				<caps-card-description>See pricing and features for each plan.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form novalidate id="form-radio-demo" (submit)="submit($event)">
					<caps-field-set>
						<caps-field-legend>Plan</caps-field-legend>
						<caps-field-description>You can upgrade or downgrade your plan at any time.</caps-field-description>
						<hlm-radio-group [formField]="form.plan">
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

						@if (form.plan().invalid() && form.plan().touched()) {
							@for (error of form.plan().errors(); track error) {
								<caps-field-error>
									{{ error.message }}
								</caps-field-error>
							}
						}
					</caps-field-set>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
				<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
				<button capsButton type="submit" form="form-radio-demo">Submit</button>
			</caps-card-footer>
		</caps-card>
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
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';

@Component({
	selector: 'spartan-signal-form-radio-group-demo',
	imports: [FormField, CapsCardImports, CapsFieldImports, HlmRadioGroupImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Subscription Plan</caps-card-title>
				<caps-card-description>See pricing and features for each plan.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<form novalidate id="form-radio-demo" (submit)="submit($event)">
					<caps-field-set>
						<caps-field-legend>Plan</caps-field-legend>
						<caps-field-description>You can upgrade or downgrade your plan at any time.</caps-field-description>
						<hlm-radio-group [formField]="form.plan">
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

						@if (form.plan().invalid() && form.plan().touched()) {
							@for (error of form.plan().errors(); track error) {
								<caps-field-error>
									{{ error.message }}
								</caps-field-error>
							}
						}
					</caps-field-set>
				</form>
			</caps-card-content>
			<caps-card-footer class="gap-2">
<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
					<button capsButton type="submit" form="form-radio-demo">Submit</button>
				</caps-card-footer>
		</caps-card>
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
