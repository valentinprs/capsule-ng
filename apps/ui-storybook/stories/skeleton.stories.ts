import { CapsSkeleton } from '@capsule-ng/caps/skeleton';
import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsSkeleton> = {
	title: 'Skeleton',
	component: CapsSkeleton,
	tags: ['autodocs'],
	decorators: [
		componentWrapperDecorator(
			(story) => `<main><h1 class="mb-4 text-lg font-semibold">Skeleton examples</h1>${story}</main>`,
		),
		moduleMetadata({
			imports: [CapsSkeleton],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsSkeleton>;

export const Default: Story = {
	render: () => ({
		template: `
   <div role='region' aria-label='Profile' aria-busy='true' class='flex items-center p-4 border rounded-lg w-full max-w-sm border-border gap-4'>
      <caps-skeleton class='size-12 shrink-0 rounded-full' />
      <div class='min-w-0 flex-1 space-y-2'>
        <caps-skeleton class='h-4 w-full' />
        <caps-skeleton class='h-4 w-4/5' />
      </div>
    </div>
    `,
	}),
};
