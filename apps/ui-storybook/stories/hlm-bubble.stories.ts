import { signal } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsButton } from '@capsule-ng/caps/button';
import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
	title: 'Bubble',
	tags: ['autodocs'],
	decorators: [
		componentWrapperDecorator(
			(story) => `<main><h1 class="mb-4 text-lg font-semibold">Bubble examples</h1>${story}</main>`,
		),
		moduleMetadata({
			imports: [CapsBubbleImports, CapsButton],
		}),
	],
};

export default meta;
type Story = StoryObj;

export const Demo: Story = {
	render: () => ({
		template: `
			<div class="flex w-full max-w-sm flex-col gap-8 p-4">
				<caps-bubble align="end">
					<caps-bubble-content>Hey there! what's up?</caps-bubble-content>
				</caps-bubble>
				<caps-bubble-group>
					<caps-bubble variant="muted">
						<caps-bubble-content>Hey! Want to see chat bubbles?</caps-bubble-content>
					</caps-bubble>
					<caps-bubble variant="muted">
						<caps-bubble-content>I can group messages, switch sides, and keep the whole thread easy to scan.</caps-bubble-content>
						<caps-bubble-reactions role="img" aria-label="Reaction: thumbs up">
							<span>👍</span>
						</caps-bubble-reactions>
					</caps-bubble>
				</caps-bubble-group>
				<caps-bubble align="end">
					<caps-bubble-content>Sure. Hit me with your best demo.</caps-bubble-content>
				</caps-bubble>
			</div>
		`,
	}),
};

export const Variants: Story = {
	render: () => ({
		template: `
			<div class="flex w-full max-w-sm flex-col gap-6 p-4">
				<caps-bubble><caps-bubble-content>default</caps-bubble-content></caps-bubble>
				<caps-bubble variant="secondary"><caps-bubble-content>secondary</caps-bubble-content></caps-bubble>
				<caps-bubble variant="muted"><caps-bubble-content>muted</caps-bubble-content></caps-bubble>
				<caps-bubble variant="tinted"><caps-bubble-content>tinted</caps-bubble-content></caps-bubble>
				<caps-bubble variant="outline"><caps-bubble-content>outline</caps-bubble-content></caps-bubble>
				<caps-bubble variant="ghost"><caps-bubble-content>ghost</caps-bubble-content></caps-bubble>
				<caps-bubble variant="destructive"><caps-bubble-content>destructive</caps-bubble-content></caps-bubble>
				<caps-bubble variant="suggestion"><caps-bubble-content>suggestion</caps-bubble-content></caps-bubble>
			</div>
		`,
	}),
};

export const Interactive: Story = {
	render: () => {
		const liked = signal(false);
		return {
			props: { liked },
			template: `<caps-bubble variant="muted"><caps-bubble-content>Ready for review.</caps-bubble-content><caps-bubble-reactions><button capsButton type="button" size="xs" variant="outline" [attr.aria-pressed]="liked()" (click)="liked.set(!liked())">Useful {{ liked() ? '1' : '0' }}</button></caps-bubble-reactions></caps-bubble>`,
		};
	},
};
