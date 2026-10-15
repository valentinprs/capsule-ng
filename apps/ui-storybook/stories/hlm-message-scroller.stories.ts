import { signal } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsMessageImports } from '@capsule-ng/caps/message';
import { CapsMessageScrollerImports } from '@capsule-ng/caps/message-scroller';
import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
	title: 'Message Scroller',
	tags: ['autodocs'],
	decorators: [
		componentWrapperDecorator(
			(story) => `<main><h1 class="mb-4 text-lg font-semibold">Message Scroller examples</h1>${story}</main>`,
		),
		moduleMetadata({
			imports: [
				CapsMessageScrollerImports,
				CapsMessageImports,
				CapsBubbleImports,
				CapsAvatarImports,
				CapsButtonImports,
			],
		}),
	],
};

export default meta;
type Story = StoryObj;

const frameStart = `
			<div class="flex h-96 w-full max-w-md flex-col overflow-hidden rounded-xl border">
`;

const frameEnd = `
			</div>
`;

function turn(id: string, who: 'me' | 'ai', text: string, anchor = false) {
	const align = who === 'me' ? ' align="end"' : '';
	const variant = who === 'ai' ? ' variant="muted"' : '';
	const fallback = who === 'me' ? 'ME' : 'AI';
	const scrollAnchor = anchor ? ' scrollAnchor' : '';
	return `
								<caps-message-scroller-item messageId="${id}"${scrollAnchor}>
									<caps-message${align}>
										<caps-message-avatar>
											<caps-avatar>
												<caps-avatar-fallback>${fallback}</caps-avatar-fallback>
											</caps-avatar>
										</caps-message-avatar>
										<caps-message-content>
											<caps-bubble${variant}>
												<caps-bubble-content>${text}</caps-bubble-content>
											</caps-bubble>
										</caps-message-content>
									</caps-message>
								</caps-message-scroller-item>`;
}

export const Default: Story = {
	render: () => ({
		template: `
${frameStart}

					<caps-message-scroller autoScroll contentClass="p-4">


${turn('1', 'me', 'Deploying to prod real quick.', true)}
${turn('2', 'ai', "It's 4:55 PM. On a Friday. MessageScroller will keep this turn readable while new content streams in below.")}
${turn('3', 'me', "It's a one-line change.", true)}
${turn('4', 'ai', "It's always a one-line change.")}


						<button caps-message-scroller-button></button>
					</caps-message-scroller>

${frameEnd}
		`,
	}),
};

export const AutoScroll: Story = {
	render: () => ({
		template: `
${frameStart}

					<caps-message-scroller autoScroll contentClass="p-4">


${turn('1', 'me', 'Can you summarize the last five commits?', true)}
${turn('2', 'ai', 'Sure — starting from the oldest.')}
${turn('3', 'ai', '1. Add the conversation scroll behavior.')}
${turn('4', 'ai', '2. Compose public Capsule messages and markers.')}
${turn('5', 'ai', '3. Document the native jump controls.')}
${turn('6', 'ai', '4. Ship docs previews for anchoring and streaming.')}
${turn('7', 'ai', '5. Expand Storybook coverage for auto-scroll.')}
${turn('8', 'me', 'Perfect — keep following new replies.', true)}
${turn('9', 'ai', 'AutoScroll stays pinned to the end while you are already there. Scroll up to pause follow.')}


						<button caps-message-scroller-button></button>
					</caps-message-scroller>

${frameEnd}
		`,
	}),
};

export const ScrollAnchors: Story = {
	render: () => ({
		template: `
${frameStart}

					<caps-message-scroller contentClass="p-4">


${turn('1', 'me', 'First user turn — marked as a scroll anchor.', true)}
${turn('2', 'ai', 'Assistant reply under that turn.')}
${turn('3', 'me', 'Second user turn — also an anchor.', true)}
${turn('4', 'ai', 'Another reply. Jump commands can target either anchor messageId.')}
${turn('5', 'me', 'Third anchor near the bottom.', true)}
${turn('6', 'ai', 'Previous-item peek keeps context above the reading line when an anchor is selected.')}


						<button caps-message-scroller-button></button>
					</caps-message-scroller>

${frameEnd}
		`,
	}),
};

export const OpeningStart: Story = {
	render: () => ({
		template: `
${frameStart}

					<caps-message-scroller defaultScrollPosition="start" contentClass="p-4">


${turn('1', 'me', 'Opening at the start of a long transcript.', true)}
${turn('2', 'ai', 'Row one — you should land near the top on first paint.')}
${turn('3', 'ai', 'Row two.')}
${turn('4', 'ai', 'Row three.')}
${turn('5', 'ai', 'Row four.')}
${turn('6', 'ai', 'Row five.')}
${turn('7', 'ai', 'Row six.')}
${turn('8', 'ai', 'Row seven — scroll down for newer messages.')}
${turn('9', 'me', 'Still more history below.', true)}
${turn('10', 'ai', 'defaultScrollPosition="start" applies once on the first non-empty render.')}


						<button caps-message-scroller-button></button>
					</caps-message-scroller>

${frameEnd}
		`,
	}),
};

/** Nested controllers retain their own native keyboard/wheel/touch intent and logical IDs. */
export const NestedScopes: Story = {
	render: () => {
		const outerRows = signal(['same', 'outer-1', 'outer-2', 'outer-3']);
		const innerRows = signal(['same', ...Array.from({ length: 8 }, (_, n) => 'inner-' + n)]);
		return {
			props: { outerRows, innerRows, appendOuter: () => outerRows.update((rows) => [...rows, 'outer-' + rows.length]) },
			template: `
    <div class="flex w-full max-w-md flex-col gap-4">
     <caps-message-scroller autoScroll aria-label="Outer conversation" class="h-96 rounded-xl border" contentClass="gap-4 p-4">
      @for (row of outerRows(); track row) {
       <caps-message-scroller-item [messageId]="row" class="min-h-24">Outer {{ row }}</caps-message-scroller-item>
      }
      <caps-message-scroller-item messageId="thread">
       <caps-message-scroller autoScroll aria-label="Inner conversation" class="h-52 rounded-lg border" contentClass="gap-4 p-4">
        @for (row of innerRows(); track row) {
         <caps-message-scroller-item [messageId]="row" class="min-h-24">Inner {{ row }}</caps-message-scroller-item>
        }
        <button caps-message-scroller-button aria-label="Latest inner messages"></button>
       </caps-message-scroller>
      </caps-message-scroller-item>
      <button caps-message-scroller-button aria-label="Latest outer messages"></button>
     </caps-message-scroller>
     <button capsButton type="button" (click)="appendOuter()">Append outer message</button>
    </div>
   `,
		};
	},
};
