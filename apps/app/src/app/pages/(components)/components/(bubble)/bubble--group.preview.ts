import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';

@Component({
	selector: 'spartan-bubble-group-preview',
	imports: [CapsBubbleImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-bubble variant="muted">
			<caps-bubble-content>Can you tell me what's the issue?</caps-bubble-content>
		</caps-bubble>
		<caps-bubble-group>
			<caps-bubble align="end">
				<caps-bubble-content>You tell me!</caps-bubble-content>
			</caps-bubble>
			<caps-bubble align="end">
				<caps-bubble-content>It worked yesterday. You broke it!</caps-bubble-content>
			</caps-bubble>
			<caps-bubble align="end">
				<caps-bubble-content>Find the bug and fix it.</caps-bubble-content>
				<caps-bubble-reactions role="img" aria-label="Reactions: eyes" align="start">
					<span>👀</span>
				</caps-bubble-reactions>
			</caps-bubble>
		</caps-bubble-group>
		<caps-bubble variant="muted">
			<caps-bubble-content>
				Want me to diff yesterday's you against today's you? It's a bit embarrassing.
			</caps-bubble-content>
		</caps-bubble>
	`,
})
export class BubbleGroupPreview {}
