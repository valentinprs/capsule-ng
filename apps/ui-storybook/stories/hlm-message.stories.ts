import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { CapsMessageImports } from '@capsule-ng/caps/message';
import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

const meta: Meta = {
	title: 'Message',
	tags: ['autodocs'],
	decorators: [
		componentWrapperDecorator(
			(story) => `<main><h1 class="mb-4 text-lg font-semibold">Message examples</h1>${story}</main>`,
		),
		moduleMetadata({
			imports: [CapsMessageImports, CapsBubbleImports, CapsAvatarImports, CapsMarkerImports],
		}),
	],
};

export default meta;
type Story = StoryObj;

export const Conversation: Story = {
	render: () => ({
		template: `
			<div class="flex w-full max-w-sm flex-col gap-6 p-4">
				<caps-message align="end">
					<caps-message-avatar>
						<caps-avatar>
							<caps-avatar-fallback>ME</caps-avatar-fallback>
						</caps-avatar>
					</caps-message-avatar>
					<caps-message-content>
						<caps-bubble>
							<caps-bubble-content>Deploying to prod real quick.</caps-bubble-content>
						</caps-bubble>
					</caps-message-content>
				</caps-message>
				<caps-message>
					<caps-message-avatar>
						<caps-avatar>
							<caps-avatar-fallback>R</caps-avatar-fallback>
						</caps-avatar>
					</caps-message-avatar>
					<caps-message-content>
						<caps-bubble variant="muted">
							<caps-bubble-content>It's 4:55 PM. On a Friday.</caps-bubble-content>
						</caps-bubble>
					</caps-message-content>
				</caps-message>
				<caps-message align="end">
					<caps-message-avatar>
						<caps-avatar>
							<caps-avatar-fallback>ME</caps-avatar-fallback>
						</caps-avatar>
					</caps-message-avatar>
					<caps-message-content>
						<caps-bubble>
							<caps-bubble-content>It's a one-line change.</caps-bubble-content>
						</caps-bubble>
						<caps-message-footer>Delivered</caps-message-footer>
					</caps-message-content>
				</caps-message>
				<caps-message>
					<caps-message-avatar>
						<caps-avatar>
							<caps-avatar-fallback>R</caps-avatar-fallback>
						</caps-avatar>
					</caps-message-avatar>
					<caps-message-content>
						<caps-bubble-group>
							<caps-bubble variant="muted">
								<caps-bubble-content>It's always a one-line change 😭.</caps-bubble-content>
							</caps-bubble>
							<caps-bubble variant="muted">
								<caps-bubble-content>Alright, let me take a look.</caps-bubble-content>
								<caps-bubble-reactions role="img" aria-label="Reaction: thumbs up">
									<span>👍</span>
								</caps-bubble-reactions>
							</caps-bubble>
						</caps-bubble-group>
					</caps-message-content>
				</caps-message>
				<caps-marker role="status">
					<caps-marker-content class="shimmer">
						<span class="font-medium">Oliver</span> is typing...
					</caps-marker-content>
				</caps-marker>
			</div>
		`,
	}),
};
