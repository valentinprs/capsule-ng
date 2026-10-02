import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsTextarea } from '@capsule-ng/caps/textarea';
import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';

export default {
	title: 'Textarea',
	component: CapsTextarea,
	tags: ['autodocs'],
	args: {
		forceInvalid: false,
	},
	argTypes: {
		forceInvalid: { control: 'boolean' },
	},
	decorators: [
		moduleMetadata({
			imports: [CapsTextarea, CapsLabel, CapsButton, FormsModule, ReactiveFormsModule, CapsFieldImports],
		}),
	],
} as Meta<{ forceInvalid: boolean }>;

type Story = StoryObj<{ forceInvalid: boolean }>;

export const Default: Story = {
	render: ({ ...args }) => ({
		props: args,
		template: `
			<textarea capsTextarea class="w-80" placeholder="Type your message here." ${argsToTemplate(args)}></textarea>
		`,
	}),
};

export const Disabled: Story = {
	render: ({ ...args }) => ({
		props: args,
		template: `
			<textarea capsTextarea disabled class="w-80" placeholder="Type your message here." ${argsToTemplate(args)}></textarea>
		`,
	}),
};

export const Required: Story = {
	render: ({ ...args }) => ({
		props: { value: '', ...args },
		template: `
			<textarea capsTextarea required [(ngModel)]="value" class="w-80" placeholder="Type your message here.*" ${argsToTemplate(args)}></textarea>
		`,
	}),
};

export const Error: Story = {
	render: ({ ...args }) => ({
		props: { ...args, forceInvalid: true },
		template: `
			<textarea capsTextarea class="w-80" placeholder="Type your message here.*" ${argsToTemplate(args)}></textarea>
		`,
	}),
};

export const WithButton: Story = {
	name: 'With Button',
	render: ({ ...args }) => ({
		props: args,
		template: `
			<div class="w-80 grid gap-2">
				<textarea capsTextarea placeholder="Type your message here." ${argsToTemplate(args)}></textarea>
				<button capsButton>Subscribe</button>
			</div>
		`,
	}),
};

export const WithHintAndError: Story = {
	render: () => ({
		props: {
			form: new FormGroup({
				message: new FormControl('', { validators: [Validators.required] }),
			}),
		},
		template: `
		<form [formGroup]="form" class="space-y-3 w-full max-w-sm">
			<caps-field>
				<caps-field-label>Message *</caps-field-label>
				<textarea
					capsTextarea
					id="textarea-hint"
					formControlName="message"
					class="w-full"
					rows="3"
					placeholder="Share your thoughts..."
				></textarea>

				<caps-field-description>Tell us what you’re working on so we can help.</caps-field-description>

				<caps-field-error >Please enter a message before continuing.</caps-field-error>
			</caps-field>

			<div class="flex flex-wrap items-center gap-2">
				<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
			</div>
		</form>
		`,
	}),
};
