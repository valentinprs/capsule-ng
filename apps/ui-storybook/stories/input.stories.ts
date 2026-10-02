import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsLabel } from '@capsule-ng/caps/label';
import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

const meta: Meta<{ forceInvalid: boolean }> = {
	title: 'Input',
	component: CapsInput,
	tags: ['autodocs'],
	args: {
		forceInvalid: false,
	},
	argTypes: {
		forceInvalid: { control: 'boolean' },
	},
	decorators: [
		moduleMetadata({
			imports: [CapsInput, CapsLabel, CapsButton, FormsModule, ReactiveFormsModule, CapsFieldImports],
		}),
	],
};

export default meta;
type Story = StoryObj<{ forceInvalid: boolean }>;

export const Default: Story = {
	render: ({ ...args }) => ({
		props: args,
		template: `
    <input aria-label='Email' class='w-80' capsInput ${argsToTemplate(args)} type='email' placeholder='Email'/>
    `,
	}),
};

export const File: Story = {
	render: ({ ...args }) => ({
		props: args,
		template: `
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <label capsLabel for="picture">Picture</label>
      <input class='w-80' capsInput ${argsToTemplate(args)} id="picture" type="file" />
    </div>`,
	}),
};

export const Disabled: Story = {
	render: ({ ...args }) => ({
		props: args,
		template: `
    <input aria-label='Email' disabled class='w-80' capsInput ${argsToTemplate(args)} type='email' placeholder='Email'/>
    `,
	}),
};

export const Required: Story = {
	render: ({ ...args }) => ({
		props: { value: '', ...args },
		template: `
    <input aria-label='Email *' [(ngModel)]="value" class='w-80' capsInput ${argsToTemplate(args)} type='email' required placeholder='Email *'/>
    `,
	}),
};

export const Error: Story = {
	render: ({ ...args }) => ({
		props: { ...args, forceInvalid: true },
		template: `
    <input aria-label='Email' class='w-80' capsInput ${argsToTemplate(args)} type='email' placeholder='Email' />
    `,
	}),
};

export const WithButton: Story = {
	name: 'With Button',
	render: ({ ...args }) => ({
		props: args,
		template: `
    <div class="flex items-center w-full max-w-sm space-x-2">
    <input aria-label='Email' class='w-80' capsInput ${argsToTemplate(args)} type='email' placeholder='Email'/>
    <button capsButton>Subscribe</button>
    </div>
    `,
	}),
};

export const WithHintAndError: Story = {
	render: () => ({
		props: {
			form: new FormGroup({
				email: new FormControl('', { validators: [Validators.required, Validators.email] }),
			}),
		},
		template: `
		<form [formGroup]="form" class="space-y-3 w-full max-w-sm">
			<caps-field>
				<caps-field-label>Email *</caps-field-label>
				<input
					capsInput
					id="input-hint"
					type="email"
					formControlName="email"
					placeholder="you@example.com"
					class="w-full"
				/>

				<caps-field-description>We’ll use this email for notifications.</caps-field-description>

				<caps-field-error>Enter a valid email address to continue.</caps-field-error>
			</caps-field>

			<div class="flex flex-wrap items-center gap-2">
				<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
			</div>
		</form>
		`,
	}),
};
