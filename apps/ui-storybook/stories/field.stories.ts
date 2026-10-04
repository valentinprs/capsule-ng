import { JsonPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsCheckbox } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { CapsSwitch } from '@capsule-ng/caps/switch';
import { CapsTextarea } from '@capsule-ng/caps/textarea';
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
				CapsSelectImports,
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
					<caps-field-label>Country</caps-field-label>
					<caps-select    placeholder="Select a country"    class="inline-block w-full">
								<caps-select-option value="us">United States</caps-select-option>
								<caps-select-option value="uk">United Kingdom</caps-select-option>
								<caps-select-option value="ca">Canada</caps-select-option>
								<caps-select-option value="au">Australia</caps-select-option>
								<caps-select-option value="de">Germany</caps-select-option>
					</caps-select>
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
										<caps-field-label>Month</caps-field-label>
										<caps-select    placeholder="MM"    class="inline-block w-full">
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
										<caps-select    placeholder="YYYY"    class="inline-block w-full">
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
