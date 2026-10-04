import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { CapsTextarea } from '@capsule-ng/caps/textarea';
import { HlmCheckbox } from '@spartan-ng/helm/checkbox';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { HlmSwitch } from '@spartan-ng/helm/switch';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

const meta: Meta = {
	title: 'Field',
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [
				CapsFieldImports,
				CapsInputImports,
				HlmCheckbox,
				HlmSwitch,
				CapsTextarea,
				CapsButton,
				CapsSelectImports,
				HlmRadioGroupImports,
				ReactiveFormsModule,
				JsonPipe,
			],
		}),
	],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field-set>
					<caps-field-group>
						<caps-field>
							<caps-field-label>Full name</caps-field-label>
							<input capsInput id="field-fullname" type="text" placeholder="John Doe" />
							<caps-field-description>This appears on invoices and emails.</caps-field-description>
						</caps-field>
						<caps-field>
							<caps-field-label>Username</caps-field-label>
							<input capsInput id="field-username" type="text" placeholder="john_doe_99" />
						</caps-field>
					</caps-field-group>
				</caps-field-set>
			</div>
		`,
	}),
};

export const WithInput: Story = {
	name: 'With Input',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field-set>
					<caps-field-group>
						<caps-field>
							<caps-field-label>Username</caps-field-label>
							<input capsInput id="field-input-username" type="text" placeholder="Alex Cooper" />
							<caps-field-description>Choose a unique username for your account.</caps-field-description>
						</caps-field>
						<caps-field>
							<caps-field-label>Password</caps-field-label>
							<caps-field-description>Must be at least 8 characters long.</caps-field-description>
							<input capsInput id="field-input-password" type="password" placeholder="••••••••" />
						</caps-field>
					</caps-field-group>
				</caps-field-set>
			</div>
		`,
	}),
};

export const WithCheckbox: Story = {
	name: 'With Checkbox',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field-group>
					<caps-field-set>
						<caps-field-legend variant="label">Show these items on the desktop</caps-field-legend>
						<caps-field-description>Select the items you want to show on the desktop.</caps-field-description>
						<caps-field-group class="gap-3">
							<caps-field orientation="horizontal">
								<hlm-checkbox inputId="field-hard-disks" />
								<caps-field-label class="font-normal">Hard disks</caps-field-label>
							</caps-field>
							<caps-field orientation="horizontal">
								<hlm-checkbox inputId="field-external-disks" />
								<caps-field-label class="font-normal">External disks</caps-field-label>
							</caps-field>
							<caps-field orientation="horizontal">
								<hlm-checkbox inputId="field-cds-dvds-ipods" />
								<caps-field-label class="font-normal">CDs, DVDs, and IPods</caps-field-label>
							</caps-field>
							<caps-field orientation="horizontal">
								<hlm-checkbox inputId="field-connected-servers" />
								<caps-field-label class="font-normal">Connected servers</caps-field-label>
							</caps-field>
						</caps-field-group>
					</caps-field-set>
					<caps-field-separator />
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-sync-desktop-documents" [checked]="true" />
						<caps-field-content>
							<caps-field-label>Sync Desktop & Documents folders</caps-field-label>
							<caps-field-description>
								Your Desktop & Documents folders are being synced with iCloud Drive. You can access them from other
								devices.
							</caps-field-description>
						</caps-field-content>
					</caps-field>
				</caps-field-group>
			</div>
		`,
	}),
};

export const WithSwitch: Story = {
	name: 'With Switch',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field orientation="horizontal">
					<caps-field-content>
						<caps-field-label>Multi-factor authentication</caps-field-label>
						<caps-field-description>
							Enable multi-factor authentication. If you do not have a two-factor device, you can use a one-time code
							sent to your email.
						</caps-field-description>
					</caps-field-content>
					<hlm-switch inputId="field-2fa" />
				</caps-field>
			</div>
		`,
	}),
};

export const WithRadio: Story = {
	name: 'With Radio',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field-set>
					<caps-field-label>Subscription Plan</caps-field-label>
					<caps-field-description>Yearly and lifetime plans offer significant savings.</caps-field-description>
					<hlm-radio-group data-slot="radio-group" value="monthly">
						<caps-field orientation="horizontal">
							<hlm-radio value="monthly" inputId="plan-monthly">
								<hlm-radio-indicator indicator />
							</hlm-radio>
							<caps-field-label class="font-normal">Monthly ($9.99/month)</caps-field-label>
						</caps-field>
						<caps-field orientation="horizontal">
							<hlm-radio value="yearly" inputId="plan-yearly">
								<hlm-radio-indicator indicator />
							</hlm-radio>
							<caps-field-label class="font-normal">Yearly ($99.99/year)</caps-field-label>
						</caps-field>
						<caps-field orientation="horizontal">
							<hlm-radio value="lifetime" inputId="plan-lifetime">
								<hlm-radio-indicator indicator />
							</hlm-radio>
							<caps-field-label class="font-normal">Lifetime ($299.99/lifetime)</caps-field-label>
						</caps-field>
					</hlm-radio-group>
				</caps-field-set>
			</div>
		`,
	}),
};

export const WithSelect: Story = {
	name: 'With Select',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field-set>
					<caps-field-group>
						<caps-field>
							<caps-field-label>Country</caps-field-label>
							<caps-select    placeholder="Select a country"    id="field-select-country" class="inline-block w-full">

										<caps-select-option value="us">United States</caps-select-option>
										<caps-select-option value="uk">United Kingdom</caps-select-option>
										<caps-select-option value="ca">Canada</caps-select-option>
										<caps-select-option value="au">Australia</caps-select-option>
										<caps-select-option value="de">Germany</caps-select-option>
							</caps-select>
							<caps-field-description>Select your country of residence.</caps-field-description>
						</caps-field>
					</caps-field-group>
				</caps-field-set>
			</div>
		`,
	}),
};

export const WithTextarea: Story = {
	name: 'With Textarea',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field-set>
					<caps-field-group>
						<caps-field>
							<caps-field-label>Comments</caps-field-label>
							<caps-field-description>Please provide any additional information.</caps-field-description>
							<textarea capsTextarea class="resize-none" id="field-comments" rows="4"></textarea>
						</caps-field>
					</caps-field-group>
				</caps-field-set>
			</div>
		`,
	}),
};

export const WithError: Story = {
	name: 'With Error',
	render: () => {
		const form = new FormGroup({
			email: new FormControl('', { validators: [Validators.required, Validators.email] }),
			username: new FormControl('', { validators: [Validators.required, Validators.minLength(3)] }),
		});
		return {
			props: {
				form,
			},
			template: `
			<div class="w-full max-w-md">
			<form [formGroup]="form">
				<caps-field-set>
					<caps-field-group>
						<caps-field>
							<caps-field-label>Email</caps-field-label>
							<input capsInput id="field-email-error" type="email" formControlName="email" />
							<caps-field-error validator="required">Email must be entered.</caps-field-error>
							<caps-field-error validator="email">Enter a valid email address.</caps-field-error>
						</caps-field>
						<caps-field>
							<caps-field-label>Username</caps-field-label>
							<input capsInput id="field-username-error" type="text" formControlName="username" />
							<caps-field-error validator="required">Username must be entered.</caps-field-error>
							<caps-field-error validator="minlength">Username must be at least 3 characters.</caps-field-error>
						</caps-field>
					</caps-field-group>
				</caps-field-set>
				<caps-field orientation="horizontal" class="mt-3">
					<button id="validate" capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
					<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
				</caps-field>
			</form>
			</div>
		`,
		};
	},
};

export const FieldGroup: Story = {
	name: 'Field Group',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field-group>
					<caps-field-set>
						<caps-field-label>Response</caps-field-label>
						<caps-field-description>
							Get notified when ChatGPT responds to requests that take time, like research or image generation.
						</caps-field-description>
						<caps-field-group data-slot="checkbox-group">
							<caps-field orientation="horizontal">
								<hlm-checkbox inputId="field-group-push-notifications" disabled [checked]="true" />
								<caps-field-label class="font-normal">Push notifications</caps-field-label>
							</caps-field>
						</caps-field-group>
					</caps-field-set>
					<caps-field-separator />
					<caps-field-set>
						<caps-field-label>Tasks</caps-field-label>
						<caps-field-description>
							Get notified when tasks you've created have updates.
							<a href="#">Manage tasks</a>
						</caps-field-description>
						<caps-field-group class="gap-3" data-slot="checkbox-group">
							<caps-field orientation="horizontal">
								<hlm-checkbox inputId="field-group-push-task" />
								<caps-field-label class="font-normal">Push notifications</caps-field-label>
							</caps-field>
							<caps-field orientation="horizontal">
								<hlm-checkbox inputId="field-group-email-task" />
								<caps-field-label class="font-normal">Email notifications</caps-field-label>
							</caps-field>
						</caps-field-group>
					</caps-field-set>
				</caps-field-group>
			</div>
		`,
	}),
};

export const ComplexForm: Story = {
	name: 'Complex Form',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<form>
					<caps-field-group>
						<caps-field-set>
							<caps-field-legend>Payment Method</caps-field-legend>
							<caps-field-description>All transactions are secure and encrypted</caps-field-description>
							<caps-field-group>
								<caps-field>
									<caps-field-label>Name on card</caps-field-label>
									<input capsInput placeholder="John Doe" id="field-complex-name-on-card" />
								</caps-field>
								<caps-field class="col-span-2">
									<caps-field-label>Card number</caps-field-label>
									<input capsInput placeholder="1234 1234 1234 1234" id="field-complex-card-number" />
									<caps-field-description>Enter your 16-digit card number without spaces or dashes.</caps-field-description>
								</caps-field>
								<div class="grid grid-cols-3 gap-4">
									<caps-field>
										<caps-field-label>Month</caps-field-label>
										<caps-select    placeholder="MM"    id="field-complex-expiration-month" class="inline-block w-full">

												<caps-select-option value="01">01</caps-select-option>
												<caps-select-option value="02">02</caps-select-option>
												<caps-select-option value="03">03</caps-select-option>
												<caps-select-option value="04">04</caps-select-option>
												<caps-select-option value="05">05</caps-select-option>
												<caps-select-option value="06">06</caps-select-option>
												<caps-select-option value="07">07</caps-select-option>
												<caps-select-option value="08">08</caps-select-option>
												<caps-select-option value="09">09</caps-select-option>
												<caps-select-option value="10">10</caps-select-option>
												<caps-select-option value="11">11</caps-select-option>
												<caps-select-option value="12">12</caps-select-option>

										</caps-select>
									</caps-field>
									<caps-field>
										<caps-field-label>Year</caps-field-label>
										<caps-select    placeholder="YYYY"    id="field-complex-expiration-year" class="inline-block w-full">

												<caps-select-option value="2024">2024</caps-select-option>
												<caps-select-option value="2025">2025</caps-select-option>
												<caps-select-option value="2026">2026</caps-select-option>
												<caps-select-option value="2027">2027</caps-select-option>
												<caps-select-option value="2028">2028</caps-select-option>
												<caps-select-option value="2029">2029</caps-select-option>

										</caps-select>
									</caps-field>
									<caps-field>
										<caps-field-label>CVV</caps-field-label>
										<input capsInput placeholder="123" id="field-complex-cvv" />
									</caps-field>
								</div>
							</caps-field-group>
						</caps-field-set>
						<caps-field-separator />
						<caps-field-set>
							<caps-field-legend>Billing Address</caps-field-legend>
							<caps-field-description>The billing address associated with your payment method</caps-field-description>
							<caps-field-group>
								<caps-field orientation="horizontal">
									<hlm-checkbox inputId="field-complex-billing-address" [checked]="true" />
									<caps-field-label>Same as shipping address.</caps-field-label>
								</caps-field>
							</caps-field-group>
						</caps-field-set>
						<caps-field-set>
							<caps-field-group>
								<caps-field>
									<caps-field-label>Comments</caps-field-label>
									<textarea capsTextarea class="resize-none" id="field-complex-comments" rows="4"></textarea>
								</caps-field>
							</caps-field-group>
						</caps-field-set>
						<button capsButton type="button">Submit</button>
							<button capsButton variant="outline" type="button">Cancel</button>
					</caps-field-group>
				</form>
			</div>
		`,
	}),
};

export const HorizontalOrientation: Story = {
	name: 'Horizontal Orientation',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field-group>
					<caps-field orientation="horizontal">
						<hlm-switch inputId="field-horizontal-notifications" />
						<caps-field-label>Enable notifications</caps-field-label>
					</caps-field>
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-horizontal-marketing" />
						<caps-field-label class="font-normal">Receive marketing emails</caps-field-label>
					</caps-field>
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-horizontal-updates" />
						<caps-field-label class="font-normal">Product updates</caps-field-label>
					</caps-field>
				</caps-field-group>
			</div>
		`,
	}),
};

export const WithFieldContent: Story = {
	name: 'With Field Content',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field-group class="gap-4">
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-content-security-updates" [checked]="true" />
						<caps-field-content>
							<caps-field-label>Security Updates</caps-field-label>
							<caps-field-description>Receive emails about your account security and important updates.</caps-field-description>
						</caps-field-content>
					</caps-field>
					<caps-field orientation="horizontal">
						<hlm-switch inputId="field-content-two-factor" />
						<caps-field-content>
							<caps-field-label>Two-Factor Authentication</caps-field-label>
							<caps-field-description>
								Add an extra layer of security to your account. You'll need to enter a code from your phone in addition
								to your password.
							</caps-field-description>
						</caps-field-content>
					</caps-field>
				</caps-field-group>
			</div>
		`,
	}),
};

export const WithFieldTitle: Story = {
	name: 'With Field Title',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field-set>
					<caps-field-legend>Account Settings</caps-field-legend>
					<caps-field-description>Manage your account preferences and security settings.</caps-field-description>
					<caps-field-group>
						<caps-field>
							<caps-field-label>Username</caps-field-label>
							<input capsInput id="field-title-username" type="text" placeholder="johndoe" />
						</caps-field>
						<caps-field>
							<caps-field-label>Email</caps-field-label>
							<input capsInput id="field-title-email" type="email" placeholder="john@example.com" />
						</caps-field>
					</caps-field-group>
				</caps-field-set>
			</div>
		`,
	}),
};
