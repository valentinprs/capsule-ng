import { CapsKbd, CapsKbdImports } from '@capsule-ng/caps/kbd';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

export default {
	title: 'Kbd',
	component: CapsKbd,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsKbdImports],
		}),
	],
} as Meta<CapsKbd>;

type Story = StoryObj<CapsKbd>;

export const Default: Story = {
	render: () => ({
		template: `

 <div class="flex flex-col items-center gap-4">
      <caps-kbd-group>
        <kbd capsKbd>⌘</kbd>
        <kbd capsKbd>⇧</kbd>
        <kbd capsKbd>⌥</kbd>
        <kbd capsKbd>⌃</kbd></caps-kbd-group>
         <caps-kbd-group>
        <kbd capsKbd>Ctrl</kbd>
        <span>+</span>
        <kbd capsKbd>B</kbd></caps-kbd-group>
    </div>
		`,
	}),
};
