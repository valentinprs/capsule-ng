import { CapsButton } from '@capsule-ng/caps/button';
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
			imports: [CapsButton],
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
