import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsCheckbox } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
import { CapsSwitch } from '@capsule-ng/caps/switch';
import { CapsTextarea } from '@capsule-ng/caps/textarea';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

const meta: Meta = {
	title: 'Field',
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [
				CapsFieldImports,
				CapsInputImports,
				CapsCheckbox,
				CapsSwitch,
				CapsTextarea,
				CapsButton,
				HlmSelectImports,
				CapsRadioGroupImports,
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
			</div>
		`,
	}),
};

export const WithInput: Story = {
	name: 'With Input',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field-group>
					<caps-field>
						<caps-field-label>Username</caps-field-label>
						<input capsInput type="text" placeholder="Alex Cooper" />
						<caps-field-description>Choose a unique username for your account.</caps-field-description>
					</caps-field>
					<caps-field>
						<caps-field-label>Password</caps-field-label>
						<caps-field-description>Must be at least 8 characters long.</caps-field-description>
						<input capsInput type="password" placeholder="••••••••" />
					</caps-field>
				</caps-field-group>
			</div>
		`,
	}),
};

export const WithCheckbox: Story = {
	name: 'With Checkbox',
	render: () => ({
		template: `
			<caps-field-group class="w-full max-w-md">
				<caps-field-set>
					<caps-field-legend variant="label">Show these items on the desktop</caps-field-legend>
					<caps-field-description>Select the items you want to show on the desktop.</caps-field-description>
					<caps-field-group class="gap-3">
						<caps-field orientation="horizontal">
							<caps-checkbox />
							<caps-field-label class="font-normal">Hard disks</caps-field-label>
						</caps-field>
						<caps-field orientation="horizontal">
							<caps-checkbox />
							<caps-field-label class="font-normal">External disks</caps-field-label>
						</caps-field>
						<caps-field orientation="horizontal">
							<caps-checkbox />
							<caps-field-label class="font-normal">CDs, DVDs, and IPods</caps-field-label>
						</caps-field>
						<caps-field orientation="horizontal">
							<caps-checkbox />
							<caps-field-label class="font-normal">Connected servers</caps-field-label>
						</caps-field>
					</caps-field-group>
				</caps-field-set>
				<caps-field-separator />
				<caps-field orientation="horizontal">
					<caps-checkbox [checked]="true" />
					<caps-field-content>
						<caps-field-label>Sync Desktop & Documents folders</caps-field-label>
						<caps-field-description>
							Your Desktop & Documents folders are being synced with iCloud Drive. You can access them from other devices.
						</caps-field-description>
					</caps-field-content>
				</caps-field>
			</caps-field-group>
		`,
	}),
};

export const WithSwitch: Story = {
	name: 'With Switch',
	render: () => ({
		template: `
			<caps-field orientation="horizontal" class="w-full max-w-md">
				<caps-field-content>
					<caps-field-label>Multi-factor authentication</caps-field-label>
					<caps-field-description>
						Enable multi-factor authentication. If you do not have a two-factor device, you can use a one-time code sent to
						your email.
					</caps-field-description>
				</caps-field-content>
				<caps-switch />
			</caps-field>
		`,
	}),
};

export const WithRadio: Story = {
	name: 'With Radio',
	render: () => ({
		template: `
			<caps-field class="w-full max-w-md">
				<caps-field-label>Subscription Plan</caps-field-label>
				<caps-field-description>Yearly and lifetime plans offer significant savings.</caps-field-description>
				<caps-radio-group value="monthly">
					<caps-radio value="monthly">Monthly ($9.99/month)</caps-radio>
					<caps-radio value="yearly">Yearly ($99.99/year)</caps-radio>
					<caps-radio value="lifetime">Lifetime ($299.99/lifetime)</caps-radio>
				</caps-radio-group>
			</caps-field>
		`,
	}),
};

export const WithSelect: Story = {
	name: 'With Select',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field>
					<caps-field-label for="field-select-country">Country</caps-field-label>
					<hlm-select class="inline-block">
						<hlm-select-trigger class="w-full" buttonId="field-select-country">
							<hlm-select-value placeholder="Select a country" />
						</hlm-select-trigger>
						<hlm-select-content *hlmSelectPortal>
							<hlm-select-group>
								<hlm-select-item value="us">United States</hlm-select-item>
								<hlm-select-item value="uk">United Kingdom</hlm-select-item>
								<hlm-select-item value="ca">Canada</hlm-select-item>
								<hlm-select-item value="au">Australia</hlm-select-item>
								<hlm-select-item value="de">Germany</hlm-select-item>
							</hlm-select-group>
						</hlm-select-content>
					</hlm-select>
					<caps-field-description>Select your country of residence.</caps-field-description>
				</caps-field>
			</div>
		`,
	}),
};

export const WithTextarea: Story = {
	name: 'With Textarea',
	render: () => ({
		template: `
			<div class="w-full max-w-md">
				<caps-field>
					<caps-field-label>Comments</caps-field-label>
					<caps-field-description>Please provide any additional information.</caps-field-description>
					<textarea capsTextarea class="resize-none" id="field-comments" rows="4"></textarea>
				</caps-field>
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
					<caps-field-group>
						<caps-field>
							<caps-field-label>Email</caps-field-label>
							<input capsInput type="email" formControlName="email" />
							<caps-field-error validator="required">Email must be entered.</caps-field-error>
							<caps-field-error validator="email">Enter a valid email address.</caps-field-error>
						</caps-field>
						<caps-field>
							<caps-field-label>Username</caps-field-label>
							<input capsInput type="text" formControlName="username" />
							<caps-field-error validator="required">Username must be entered.</caps-field-error>
							<caps-field-error validator="minlength">Username must be at least 3 characters.</caps-field-error>
						</caps-field>
					</caps-field-group>

					<div class="flex gap-2 mt-3">
						<button id="validate" capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
						<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
					</div>
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
			<caps-field-group class="w-full max-w-md">
				<caps-field-set>
					<caps-field-legend variant="label">Response</caps-field-legend>
					<caps-field-description>
						Get notified when ChatGPT responds to requests that take time, like research or image generation.
					</caps-field-description>

					<caps-field orientation="horizontal">
						<caps-checkbox disabled [checked]="true" />
						<caps-field-label class="font-normal">Push notifications</caps-field-label>
					</caps-field>
				</caps-field-set>
				<caps-field-separator />
				<caps-field-set>
					<caps-field-legend variant="label">Tasks</caps-field-legend>
					<caps-field-description>
						Get notified when tasks you've created have updates.
						<a href="#">Manage tasks</a>
					</caps-field-description>
					<caps-field-group>
						<caps-field orientation="horizontal">
							<caps-checkbox />
							<caps-field-label class="font-normal">Push notifications</caps-field-label>
						</caps-field>
						<caps-field orientation="horizontal">
							<caps-checkbox />
							<caps-field-label class="font-normal">Email notifications</caps-field-label>
						</caps-field>
					</caps-field-group>
				</caps-field-set>
			</caps-field-group>
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
									<input capsInput placeholder="John Doe" />
								</caps-field>
								<caps-field class="col-span-2">
									<caps-field-label>Card number</caps-field-label>
									<input capsInput placeholder="1234 1234 1234 1234" />
									<caps-field-description>Enter your 16-digit card number without spaces or dashes.</caps-field-description>
								</caps-field>
								<div class="grid grid-cols-3 gap-4">
									<caps-field>
										<caps-field-label for="field-complex-expiration-month">Month</caps-field-label>
										<hlm-select class="inline-block">
											<hlm-select-trigger class="w-full" id="field-complex-expiration-month">
												<hlm-select-value placeholder="MM" />
											</hlm-select-trigger>
											<hlm-select-content *hlmSelectPortal>
												<hlm-select-group>
													<hlm-select-item value="01">01</hlm-select-item>
													<hlm-select-item value="02">02</hlm-select-item>
													<hlm-select-item value="03">03</hlm-select-item>
													<hlm-select-item value="04">04</hlm-select-item>
													<hlm-select-item value="05">05</hlm-select-item>
													<hlm-select-item value="06">06</hlm-select-item>
													<hlm-select-item value="07">07</hlm-select-item>
													<hlm-select-item value="08">08</hlm-select-item>
													<hlm-select-item value="09">09</hlm-select-item>
													<hlm-select-item value="10">10</hlm-select-item>
													<hlm-select-item value="11">11</hlm-select-item>
													<hlm-select-item value="12">12</hlm-select-item>
												</hlm-select-group>
											</hlm-select-content>
										</hlm-select>
									</caps-field>
									<caps-field>
										<caps-field-label for="field-complex-expiration-year">Year</caps-field-label>
										<hlm-select class="inline-block">
											<hlm-select-trigger class="w-full" id="field-complex-expiration-year">
												<hlm-select-value placeholder="YYYY" />
											</hlm-select-trigger>
											<hlm-select-content *hlmSelectPortal>
												<hlm-select-group>
													<hlm-select-item value="2024">2024</hlm-select-item>
													<hlm-select-item value="2025">2025</hlm-select-item>
													<hlm-select-item value="2026">2026</hlm-select-item>
													<hlm-select-item value="2027">2027</hlm-select-item>
													<hlm-select-item value="2028">2028</hlm-select-item>
													<hlm-select-item value="2029">2029</hlm-select-item>
												</hlm-select-group>
											</hlm-select-content>
										</hlm-select>
									</caps-field>
									<caps-field>
										<caps-field-label>CVV</caps-field-label>
										<input capsInput placeholder="123" />
									</caps-field>
								</div>
							</caps-field-group>
						</caps-field-set>
						<caps-field-separator />
						<caps-field-set>
							<caps-field-legend>Billing Address</caps-field-legend>
							<caps-field-description>The billing address associated with your payment method</caps-field-description>

							<caps-field orientation="horizontal">
								<caps-checkbox [checked]="true" />
								<caps-field-label>Same as shipping address.</caps-field-label>
							</caps-field>
						</caps-field-set>

						<caps-field>
							<caps-field-label>Comments</caps-field-label>
							<textarea capsTextarea class="resize-none" rows="4"></textarea>
						</caps-field>

						<div class="flex gap-2">
							<button capsButton type="button">Submit</button>
							<button capsButton variant="outline" type="button">Cancel</button>
						</div>
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
			<caps-field-group class="w-full max-w-md">
				<caps-field orientation="horizontal">
					<caps-switch />
					<caps-field-label>Enable notifications</caps-field-label>
				</caps-field>
				<caps-field orientation="horizontal">
					<caps-checkbox />
					<caps-field-label class="font-normal">Receive marketing emails</caps-field-label>
				</caps-field>
				<caps-field orientation="horizontal">
					<caps-checkbox />
					<caps-field-label class="font-normal">Product updates</caps-field-label>
				</caps-field>
			</caps-field-group>
		`,
	}),
};

export const WithFieldContent: Story = {
	name: 'With Field Content',
	render: () => ({
		template: `
			<caps-field-group class="w-full max-w-md gap-4">
				<caps-field orientation="horizontal">
					<caps-checkbox [checked]="true" />
					<caps-field-content>
						<caps-field-label>Security Updates</caps-field-label>
						<caps-field-description>Receive emails about your account security and important updates.</caps-field-description>
					</caps-field-content>
				</caps-field>
				<caps-field orientation="horizontal">
					<caps-switch />
					<caps-field-content>
						<caps-field-label>Two-Factor Authentication</caps-field-label>
						<caps-field-description>
							Add an extra layer of security to your account. You'll need to enter a code from your phone in addition to your
							password.
						</caps-field-description>
					</caps-field-content>
				</caps-field>
			</caps-field-group>
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
							<input capsInput type="text" placeholder="johndoe" />
						</caps-field>
						<caps-field>
							<caps-field-label>Email</caps-field-label>
							<input capsInput type="email" placeholder="john@example.com" />
						</caps-field>
					</caps-field-group>
				</caps-field-set>
			</div>
		`,
	}),
};
