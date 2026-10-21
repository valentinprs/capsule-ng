import { CapsButton } from '@capsule-ng/caps/button';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';
import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsButton> = {
	title: 'Button',
	component: CapsButton,
	tags: ['autodocs'],
	args: {
		variant: 'default',
		size: 'default',
	},
	argTypes: {
		variant: {
			options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [CapsButton, CapsSpinnerImports],
		}),
	],
	render: ({ ...args }) => ({
		props: args,
		template: `<button capsButton ${argsToTemplate(args)}>Click me</button>`,
	}),
};

export default meta;
type Story = StoryObj<CapsButton>;

export const Default: Story = {
	args: {
		variant: 'default',
		size: 'default',
	},
};

export const Destructive: Story = {
	args: {
		variant: 'destructive',
		size: 'default',
	},
};

export const Outline: Story = {
	args: {
		variant: 'outline',
		size: 'default',
	},
};

export const Secondary: Story = {
	args: {
		variant: 'secondary',
		size: 'default',
	},
};

export const Ghost: Story = {
	args: {
		variant: 'ghost',
		size: 'default',
	},
};

export const Link: Story = {
	args: {
		variant: 'link',
		size: 'default',
	},
};

export const Sizes: Story = {
	render: ({ variant }) => ({
		props: { variant },
		template: `
			<div class="flex flex-wrap items-center gap-2">
				<button capsButton [variant]="variant" size="xs">Extra small</button>
				<button capsButton [variant]="variant" size="sm">Small</button>
				<button capsButton [variant]="variant" size="default">Default</button>
				<button capsButton [variant]="variant" size="lg">Large</button>
			</div>
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		template: `
			<div class="flex flex-wrap items-center gap-2">
				<button capsButton disabled>Default</button>
				<button capsButton variant="secondary" disabled>Secondary</button>
				<button capsButton variant="outline" disabled>Outline</button>
				<button capsButton variant="ghost" disabled>Ghost</button>
				<button capsButton variant="destructive" disabled>Destructive</button>
				<button capsButton variant="link" disabled>Link</button>
			</div>
		`,
	}),
};

export const WithSpinner: Story = {
	name: 'With Spinner (loading)',
	render: () => ({
		template: `
			<div class="flex flex-wrap items-center gap-2">
				<button capsButton disabled>
					<caps-spinner aria-label="Submitting" />
					Submit
				</button>
				<button capsButton variant="outline" size="sm" disabled>
					<caps-spinner aria-label="Saving" />
					Saving
				</button>
			</div>
		`,
	}),
};
