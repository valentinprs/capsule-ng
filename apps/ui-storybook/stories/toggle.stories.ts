import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideItalic } from '@ng-icons/lucide';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CapsToggle } from '@capsule-ng/caps/toggle';

const meta: Meta<CapsToggle> = {
	title: 'Toggle',
	component: CapsToggle,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsToggle, NgIcon],
			providers: [provideIcons({ lucideItalic })],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsToggle>;

export const Default: Story = {
	render: () => ({
		template: `
    <div class='space-x-3'>
    <button aria-label='Italic Toggle' size='sm' capsToggle><ng-icon name='lucideItalic'/></button>
    <button aria-label='Italic Toggle' capsToggle><ng-icon name='lucideItalic'/></button>
    <button aria-label='Italic Toggle' size='lg' capsToggle><ng-icon name='lucideItalic'/></button>
    <button aria-label='Italic Toggle' variant='outline' capsToggle><ng-icon name='lucideItalic'/></button>
    <button aria-label='Italic Toggle' disabled capsToggle><ng-icon name='lucideItalic'/></button>
    </div>
    `,
	}),
};

export const Ghost: Story = {
	name: 'Variant: Default (ghost)',
	render: () => ({
		template: `
    <div class='space-x-3'>
    <button aria-label='Italic Toggle' variant='default' capsToggle><ng-icon name='lucideItalic'/></button>
    <button aria-label='Italic Toggle' variant='default' state='on' capsToggle><ng-icon name='lucideItalic'/></button>
    <button aria-label='Italic Toggle' variant='default' disabled capsToggle><ng-icon name='lucideItalic'/></button>
    </div>
    `,
	}),
};

export const Outline: Story = {
	name: 'Variant: Outline',
	render: () => ({
		template: `
    <div class='space-x-3'>
    <button aria-label='Italic Toggle' variant='outline' capsToggle><ng-icon name='lucideItalic'/></button>
    <button aria-label='Italic Toggle' variant='outline' state='on' capsToggle><ng-icon name='lucideItalic'/></button>
    <button aria-label='Italic Toggle' variant='outline' disabled capsToggle><ng-icon name='lucideItalic'/></button>
    </div>
    `,
	}),
};

export const WithText: Story = {
	name: 'With Text',
	render: () => ({
		template: `
    <div class='space-x-3'>
    <button size='sm' capsToggle><ng-icon name='lucideItalic'/> <span class='ml-2'>Italic</span></button>
    <button capsToggle><ng-icon name='lucideItalic'/> <span class='ml-2'>Italic</span></button>
    <button size='lg' capsToggle><ng-icon name='lucideItalic'/> <span class='ml-2'>Italic</span></button>
    <button variant='outline' capsToggle><ng-icon name='lucideItalic'/> <span class='ml-2'>Italic</span></button>
    <button disabled capsToggle><ng-icon name='lucideItalic'/> <span class='ml-2'>Italic</span></button>
    </div>
`,
	}),
};
