import { CapsSeparator } from '@capsule-ng/caps/separator';
import { type Meta, type StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type SeparatorArgs = { orientation: 'horizontal' | 'vertical'; decorative: boolean };

const meta: Meta<SeparatorArgs> = {
	title: 'Separator',
	component: CapsSeparator,
	tags: ['autodocs'],
	args: {
		orientation: 'horizontal',
		decorative: true,
	},
	argTypes: {
		orientation: {
			options: ['horizontal', 'vertical'],
			control: {
				type: 'select',
			},
			table: {
				defaultValue: { summary: 'horizontal' },
			},
		},
		decorative: {
			control: {
				type: 'boolean',
			},
			table: {
				defaultValue: { summary: 'true' },
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [CapsSeparator],
		}),
	],
};

export default meta;
type Story = StoryObj<SeparatorArgs>;

export const Default: Story = {
	args: { decorative: false },
	render: ({ ...args }) => ({
		props: args,
		template: `
    <div>
      <div class='space-y-1'>
        <h4 class='text-sm font-medium leading-none'>Radix Primitives</h4>
        <p class='text-sm text-muted-foreground'>
          An open-source UI component library.
        </p>
      </div>
      <caps-separator ${argsToTemplate(args)} class='my-4' />
	  <div class='flex items-center h-5 text-sm space-x-4'>
        <div>Blog</div>
        <caps-separator decorative orientation='vertical' />
		<div>Docs</div>
        <caps-separator decorative orientation='vertical' />
		<div>Source</div>
      </div>
    </div>
       `,
	}),
};
