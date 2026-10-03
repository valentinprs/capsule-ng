import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
import { CapsSwitchImports } from '@capsule-ng/caps/switch';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
	selector: 'spartan-signal-form-complex-demo',
	imports: [
		FormField,
		HlmCardImports,
		CapsFieldImports,
		CapsRadioGroupImports,
		CapsCheckboxImports,
		HlmSelectImports,
		CapsSwitchImports,
		CapsButtonImports,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: `
		<hlm-card>
			<hlm-card-header class="border-b">
				<h3 hlmCardTitle>You're almost there!</h3>
				<p hlmCardDescription>Choose your subscription plan and billing period.</p>
			</hlm-card-header>
			<div hlmCardContent>
				<form novalidate id="form-complex-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field-set>
							<caps-field-legend variant="label">Subscription Plan</caps-field-legend>
							<caps-field-description>Choose your subscription plan.</caps-field-description>
							<caps-radio-group [formField]="form.plan">
								@for (plan of plans; track plan.id) {
									<caps-field-label [for]="'complex-plan-' + plan.id">
										<caps-field orientation="horizontal">
											<caps-field-content>
												<span class="font-medium">{{ plan.title }}</span>
												<caps-field-description>{{ plan.description }}</caps-field-description>
											</caps-field-content>
											<caps-radio [value]="plan.id" [id]="'complex-plan-' + plan.id" />
										</caps-field>
									</caps-field-label>
								}
							</caps-radio-group>
						</caps-field-set>
						<caps-field-separator />
						<caps-field>
							<caps-field-label>Billing Period</caps-field-label>
							<hlm-select [formField]="form.billingPeriod" [itemToString]="itemToString">
								<hlm-select-trigger buttonId="billingPeriod" class="w-full">
									<hlm-select-value placeholder="Select" />
								</hlm-select-trigger>
								<hlm-select-content *hlmSelectPortal>
									<hlm-select-group>
										@for (billingPeriod of billingPeriods; track $index) {
											<hlm-select-item [value]="billingPeriod.value">
												{{ billingPeriod.label }}
											</hlm-select-item>
										}
									</hlm-select-group>
								</hlm-select-content>
							</hlm-select>
							<caps-field-description>Choose how often you want to be billed.</caps-field-description>
							@for (error of form.billingPeriod().errors(); track error) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
						<caps-field-separator />
						<caps-field-set>
							<caps-field-legend variant="label">Add-ons</caps-field-legend>
							<caps-field-description>Select additional features you'd like to include.</caps-field-description>
							<caps-field-group data-slot="checkbox-group">
								@for (addon of addons; track addon.id) {
									<caps-field
										orientation="horizontal"
										[forceInvalid]="form.addons().invalid() && form.addons().touched()"
									>
										<caps-checkbox
											[forceInvalid]="form.addons().invalid() && form.addons().touched()"
											[checked]="form.addons().value().includes(addon.id)"
											(checkedChange)="handleChange($event, addon.id)"
										/>
										<caps-field-content>
											<caps-field-label class="font-normal">
												{{ addon.title }}
											</caps-field-label>
											<caps-field-description>{{ addon.description }}</caps-field-description>
										</caps-field-content>
									</caps-field>
								}
							</caps-field-group>
						</caps-field-set>
						@if (form.addons().invalid() && form.addons().touched()) {
							@for (error of form.addons().errors(); track error) {
								<caps-field-error>{{ error.message }}</caps-field-error>
							}
						}
						<caps-field-separator />
						<caps-field orientation="horizontal">
							<caps-field-content>
								<caps-field-label>Email Notifications</caps-field-label>
								<caps-field-description>Receive email updates about your subscription</caps-field-description>
								@for (error of form.emailNotifications().errors(); track error) {
									<caps-field-error [validator]="error.kind">
										{{ error.message }}
									</caps-field-error>
								}
							</caps-field-content>
							<caps-switch [formField]="form.emailNotifications" />
						</caps-field>
					</caps-field-group>
				</form>
			</div>
			<hlm-card-footer>
				<caps-field>
					<button capsButton type="submit" form="form-complex-demo">Save preferences</button>
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
				</caps-field>
			</hlm-card-footer>
		</hlm-card>
	`,
})
export class SignalFormComplexDemo {
	protected readonly _model = signal<{
		plan: string;
		billingPeriod: string | null;
		addons: string[];
		emailNotifications: boolean;
	}>({
		plan: 'basic',
		billingPeriod: null,
		addons: [],
		emailNotifications: false,
	});

	public readonly form = form(this._model, (schemaPath) => {
		required(schemaPath.plan, { message: 'Please select a subscription plan' });
		required(schemaPath.billingPeriod, { message: 'Please select a billing period' });
		minLength(schemaPath.addons, 1, { message: 'Please select at least one add-on' });
	});

	public plans = [
		{
			id: 'basic',
			title: 'Basic',
			description: 'For individuals and small teams',
		},
		{
			id: 'pro',
			title: 'Pro',
			description: 'For businesses with higher demands',
		},
	];

	public billingPeriods = [
		{ label: 'Monthly', value: 'monthly' },
		{ label: 'Yearly', value: 'yearly' },
	];

	public itemToString = (value: string) => this.billingPeriods.find((period) => period.value === value)?.label ?? '';

	public addons = [
		{
			id: 'analytics',
			title: 'Analytics',
			description: 'Advanced analytics and reporting',
		},
		{
			id: 'backup',
			title: 'Backup',
			description: 'Automated daily backups',
		},
		{
			id: 'support',
			title: 'Priority Support',
			description: '24/7 premium customer support',
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

	handleChange(checked: boolean, id: string) {
		if (checked) {
			this.form.addons().value.update((addons) => [...addons, id]);
		} else {
			this.form.addons().value.update((addons) => addons.filter((addonId) => addonId !== id));
		}

		this.form.addons().markAsTouched();
	}

	reset() {
		this.form().reset({
			plan: 'basic',
			billingPeriod: null,
			addons: [],
			emailNotifications: false,
		});
	}
}

export const signalFormsComplexDemoCode = `
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { CapsSwitchImports } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-signal-form-complex-demo',
	imports: [
		FormField,
		HlmCardImports,
		CapsFieldImports,
		CapsRadioGroupImports,
		CapsCheckboxImports,
		HlmSelectImports,
		CapsSwitchImports,
		CapsButtonImports,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full sm:max-w-md' },
	template: \`
		<hlm-card>
			<hlm-card-header class="border-b">
				<h3 hlmCardTitle>You're almost there!</h3>
				<p hlmCardDescription>Choose your subscription plan and billing period.</p>
			</hlm-card-header>
			<div hlmCardContent>
				<form novalidate id="form-complex-demo" (submit)="submit($event)">
					<caps-field-group>
						<caps-field-set>
							<caps-field-legend variant="label">Subscription Plan</caps-field-legend>
							<caps-field-description>Choose your subscription plan.</caps-field-description>
							<caps-radio-group [formField]="form.plan">
								@for (plan of plans; track plan.id) {
									<caps-field-label [for]="'complex-plan-' + plan.id">
										<caps-field orientation="horizontal">
											<caps-field-content>
												<span class="font-medium">{{ plan.title }}</span>
												<caps-field-description>{{ plan.description }}</caps-field-description>
											</caps-field-content>
											<caps-radio [value]="plan.id" [id]="'complex-plan-' + plan.id" />
										</caps-field>
									</caps-field-label>
								}
							</caps-radio-group>
						</caps-field-set>
						<caps-field-separator />
						<caps-field>
							<caps-field-label>Billing Period</caps-field-label>
							<hlm-select [formField]="form.billingPeriod" [itemToString]="itemToString">
								<hlm-select-trigger buttonId="billingPeriod" class="w-full">
									<hlm-select-value placeholder="Select" />
								</hlm-select-trigger>
								<hlm-select-content *hlmSelectPortal>
									<hlm-select-group>
										@for (billingPeriod of billingPeriods; track $index) {
											<hlm-select-item [value]="billingPeriod.value">
												{{ billingPeriod.label }}
											</hlm-select-item>
										}
									</hlm-select-group>
								</hlm-select-content>
							</hlm-select>
							<caps-field-description>Choose how often you want to be billed.</caps-field-description>
							@for (error of form.billingPeriod().errors(); track error) {
								<caps-field-error [validator]="error.kind">
									{{ error.message }}
								</caps-field-error>
							}
						</caps-field>
						<caps-field-separator />
						<caps-field-set>
							<caps-field-legend variant="label">Add-ons</caps-field-legend>
							<caps-field-description>Select additional features you'd like to include.</caps-field-description>
							<caps-field-group data-slot="checkbox-group">
								@for (addon of addons; track addon.id) {
									<caps-field
										orientation="horizontal"
										[forceInvalid]="form.addons().invalid() && form.addons().touched()"
									>
										<caps-checkbox

											[forceInvalid]="form.addons().invalid() && form.addons().touched()"
											[checked]="form.addons().value().includes(addon.id)"
											(checkedChange)="handleChange($event, addon.id)"
										/>
										<caps-field-content>
											<caps-field-label class="font-normal">
												{{ addon.title }}
											</caps-field-label>
											<caps-field-description>{{ addon.description }}</caps-field-description>
										</caps-field-content>
									</caps-field>
								}
							</caps-field-group>
						</caps-field-set>
						@if (form.addons().invalid() && form.addons().touched()) {
							@for (error of form.addons().errors(); track error) {
								<caps-field-error>{{ error.message }}</caps-field-error>
							}
						}
						<caps-field-separator />
						<caps-field orientation="horizontal">
							<caps-field-content>
								<caps-field-label>Email Notifications</caps-field-label>
								<caps-field-description>Receive email updates about your subscription</caps-field-description>
								@for (error of form.emailNotifications().errors(); track error) {
									<caps-field-error [validator]="error.kind">
										{{ error.message }}
									</caps-field-error>
								}
							</caps-field-content>
							<caps-switch [formField]="form.emailNotifications" />
						</caps-field>
					</caps-field-group>
				</form>
			</div>
			<hlm-card-footer>
				<caps-field>
					<button capsButton type="submit" form="form-complex-demo">Save preferences</button>
					<button capsButton variant="outline" type="button" (click)="reset()">Reset</button>
				</caps-field>
			</hlm-card-footer>
		</hlm-card>
	\`,
})
export class SignalFormComplexDemo {
	protected readonly _model = signal<{
		plan: string;
		billingPeriod: string | null;
		addons: string[];
		emailNotifications: boolean;
	}>({
		plan: 'basic',
		billingPeriod: null,
		addons: [],
		emailNotifications: false,
	});

	public readonly form = form(this._model, (schemaPath) => {
		required(schemaPath.plan, { message: 'Please select a subscription plan' });
		required(schemaPath.billingPeriod, { message: 'Please select a billing period' });
		minLength(schemaPath.addons, 1, { message: 'Please select at least one add-on' });
	});

	public plans = [
		{
			id: 'basic',
			title: 'Basic',
			description: 'For individuals and small teams',
		},
		{
			id: 'pro',
			title: 'Pro',
			description: 'For businesses with higher demands',
		},
	];

	public billingPeriods = [
		{ label: 'Monthly', value: 'monthly' },
		{ label: 'Yearly', value: 'yearly' },
	];

	public itemToString = (value: string) => this.billingPeriods.find((period) => period.value === value)?.label ?? '';

	public addons = [
		{
			id: 'analytics',
			title: 'Analytics',
			description: 'Advanced analytics and reporting',
		},
		{
			id: 'backup',
			title: 'Backup',
			description: 'Automated daily backups',
		},
		{
			id: 'support',
			title: 'Priority Support',
			description: '24/7 premium customer support',
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

	handleChange(checked: boolean, id: string) {
		if (checked) {
			this.form.addons().value.update((addons) => [...addons, id]);
		} else {
			this.form.addons().value.update((addons) => addons.filter((addonId) => addonId !== id));
		}

		this.form.addons().markAsTouched();
	}

	reset() {
		this.form().reset({
			plan: 'basic',
			billingPeriod: null,
			addons: [],
			emailNotifications: false,
		});
	}
}
`;
