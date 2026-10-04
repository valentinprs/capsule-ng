import { CapsAspectRatio } from '@capsule-ng/caps/aspect-ratio';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

export type AspectRatio = { ratio: string | number };
const meta: Meta<AspectRatio> = {
	title: 'Aspect Ratio',
	component: CapsAspectRatio,
	tags: ['autodocs'],
	args: { ratio: '16/9' },
	argTypes: {
		ratio: {
			options: ['16/9', '1/1', '5/4', '3/2', 1.234],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [CapsAspectRatio],
		}),
	],
};

export default meta;
type Story = StoryObj<AspectRatio>;

export const Default: Story = {
	args: {
		ratio: '16/9',
	},
	render: ({ ratio }) => ({
		props: {
			ratio,
		},
		template: `
      <div class='max-w-xl overflow-hidden rounded-xl drop-shadow'>
        <caps-aspect-ratio [ratio]='ratio'>
          <img
            class='size-full object-cover'
            alt='Mountain views'
            src='/mountains.jpg'
          />
        </caps-aspect-ratio>
      </div>
    `,
	}),
};
