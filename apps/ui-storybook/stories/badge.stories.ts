import { CapsBadgeDirective, CapsBadgeImports } from '@capsule-ng/caps/badge';
import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
const meta: Meta<CapsBadgeDirective> = {
	title: 'Badge',
	component: CapsBadgeDirective,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			options: [
				'red',
				'magenta',
				'purple',
				'blue',
				'cyan',
				'teal',
				'green',
				'gray',
				'cool-gray',
				'warm-gray',
				'high-contrast',
				'outline',
			],
			control: 'select',
		},
		size: { options: ['sm', 'md', 'lg'], control: 'select' },
		skeleton: { control: 'boolean' },
	},
	decorators: [moduleMetadata({ imports: [CapsBadgeImports] })],
	render: (args) => ({ props: args, template: `<caps-badge ${argsToTemplate(args)}>I am a badge</caps-badge>` }),
};
export default meta;
type Story = StoryObj<CapsBadgeDirective>;
export const Default: Story = { args: { variant: 'gray', size: 'md', skeleton: false } };
export const Destructive: Story = { args: { variant: 'red' } };
export const Outline: Story = { args: { variant: 'outline' } };
export const Secondary: Story = { args: { variant: 'gray' } };
export const Skeleton: Story = { args: { skeleton: true } };
export const Sizes: Story = {
	render: () => ({
		template:
			'<caps-badge size="sm">Small</caps-badge><caps-badge>Medium</caps-badge><caps-badge size="lg">Large</caps-badge>',
	}),
};
