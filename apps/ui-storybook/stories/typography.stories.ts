import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

/**
 * The Capsule 2 Figma text styles (Inter, headings in Medium). Capsule has no typography tokens yet, so
 * the story spells them out with Tailwind utilities.
 */
const styles = {
	h1: 'text-[2.5rem]/10 font-medium tracking-[-1.5px]',
	h2: 'text-[1.625rem]/[1.625rem] font-medium tracking-[-1px]',
	h3: 'text-[1.375rem]/[1.2] font-medium tracking-[-0.5px]',
	h4: 'text-lg/[1.2] font-medium',
	caption: 'text-[0.8125rem]/[1.28125rem] tracking-[1px]',
	large: 'text-lg/[1.6875rem]',
	paragraph: 'text-base/6',
	small: 'text-sm/5',
	mini: 'text-xs/4',
	mono: 'font-mono text-base/6',
	monoSmall: 'font-mono text-sm/5',
	monoMini: 'font-mono text-xs/4',
};

const specimens: { name: string; spec: string; className: string }[] = [
	{ name: 'heading 1', spec: '40/40, -1.5, Medium', className: styles.h1 },
	{ name: 'heading 2', spec: '26/26, -1, Medium', className: styles.h2 },
	{ name: 'heading 3', spec: '22/26.4, -0.5, Medium', className: styles.h3 },
	{ name: 'heading 4', spec: '18/21.6, Medium', className: styles.h4 },
	{ name: 'caption', spec: '13/20.5, +1, Regular', className: styles.caption },
	{ name: 'paragraph large', spec: '18/27', className: styles.large },
	{ name: 'paragraph', spec: '16/24', className: styles.paragraph },
	{ name: 'paragraph small', spec: '14/20', className: styles.small },
	{ name: 'paragraph mini', spec: '12/16', className: styles.mini },
	{ name: 'monospace', spec: 'Geist Mono 16/24', className: styles.mono },
	{ name: 'monospace small', spec: 'Geist Mono 14/20', className: styles.monoSmall },
	{ name: 'monospace mini', spec: 'Geist Mono 12/16', className: styles.monoMini },
];

const meta: Meta<{}> = {
	title: 'Typography',
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [],
		}),
	],
};

export default meta;
type Story = StoryObj<{}>;

export const Default: Story = {
	render: () => ({
		template: `
    <h1 class="${styles.h1}">The Joke Tax Chronicles</h1>
    <p class="${styles.large} text-muted-foreground mt-4">
      Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day,
      his advisors came to him with a problem: the kingdom was running out of money.
    </p>
    <h2 class="${styles.h2} mt-10">The King's Plan</h2>
    <p class="${styles.paragraph} mt-4">
      The king thought long and hard, and finally came up with a brilliant plan: he would tax the jokes in the kingdom.
    </p>
    <blockquote class="${styles.paragraph} border-border mt-6 border-s-2 ps-6 italic">
      "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
    </blockquote>
    <h3 class="${styles.h3} mt-8">The Joke Tax</h3>
    <p class="${styles.paragraph} mt-4">The king's subjects were not amused. They grumbled and complained, but the king was firm:</p>
    <ul class="${styles.paragraph} my-4 ms-6 list-disc [&>li]:mt-2">
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners: 20 gold coins</li>
    </ul>
    <h4 class="${styles.h4} mt-8">Jokester's Revolt</h4>
    <p class="${styles.paragraph} mt-4">
      Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the
      king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.
    </p>
    <p class="${styles.small} text-muted-foreground mt-4">
      The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas.
    </p>
    `,
	}),
};

/** Every Figma text style with its size, line height and letter spacing. */
export const TextStyles: Story = {
	render: () => ({
		props: { specimens },
		template: `
    <dl class="grid grid-cols-[10rem_1fr] items-baseline gap-x-6 gap-y-4">
      @for (style of specimens; track style.name) {
        <dt class="text-muted-foreground text-xs/4">{{ style.name }}<br />{{ style.spec }}</dt>
        <dd [class]="style.className">The quick brown fox jumps over the lazy dog</dd>
      }
    </dl>
    `,
	}),
};
