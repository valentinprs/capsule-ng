import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';

@Component({
	selector: 'spartan-bubble-preview',
	imports: [CapsBubbleImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-bubble align="end">
			<caps-bubble-content>Hey there! what's up?</caps-bubble-content>
		</caps-bubble>

		<caps-bubble-group>
			<caps-bubble variant="muted">
				<caps-bubble-content>Hey! Want to see chat bubbles?</caps-bubble-content>
			</caps-bubble>
			<caps-bubble variant="muted">
				<caps-bubble-content>
					I can group messages, switch sides, and keep the whole thread easy to scan.
				</caps-bubble-content>
				<caps-bubble-reactions role="img" aria-label="Reaction: thumbs up">
					<span>👍</span>
				</caps-bubble-reactions>
			</caps-bubble>
		</caps-bubble-group>

		<caps-bubble align="end">
			<caps-bubble-content>Sure. Hit me with your best demo.</caps-bubble-content>
		</caps-bubble>

		<caps-bubble variant="muted">
			<caps-bubble-content>
				Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.
			</caps-bubble-content>
			<caps-bubble-reactions role="img" aria-label="Reactions: thumbs up, fire, eyes, and 2 more">
				<span>👍</span>
				<span>🔥</span>
				<span>👀</span>
				<span>+2</span>
			</caps-bubble-reactions>
		</caps-bubble>
	`,
})
export class BubblePreview {}

export const defaultImports = `
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
`;

export const defaultSkeleton = `
<caps-bubble>
  <caps-bubble-content>How can I help you today?</caps-bubble-content>
</caps-bubble>
`;
