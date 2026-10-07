import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsButton } from '@capsule-ng/caps/button';
import { toast } from '@spartan-ng/brain/sonner';

@Component({
	selector: 'spartan-bubble-reactions-preview',
	imports: [CapsBubbleImports, CapsButton],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-12 py-12',
	},
	template: `
		<caps-bubble variant="muted" align="end">
			<caps-bubble-content>I don't need tests, I know my code works.</caps-bubble-content>
			<caps-bubble-reactions align="start" role="img" aria-label="Reactions: thumbs up, surprised">
				<span>👍</span>
				<span>😮</span>
			</caps-bubble-reactions>
		</caps-bubble>
		<caps-bubble variant="muted">
			<caps-bubble-content>Bold. Fine I'll add some tests. I'll let you know when they're done.</caps-bubble-content>
			<caps-bubble-reactions role="img" aria-label="Reactions: eyes, rocket, and 2 more">
				<span>👀</span>
				<span>🚀</span>
				<span>+2</span>
			</caps-bubble-reactions>
		</caps-bubble>
		<caps-bubble variant="default" align="end">
			<caps-bubble-content>Tests passed on the first try. All 142 of them. Looking good!</caps-bubble-content>
			<caps-bubble-reactions side="top" align="start" role="img" aria-label="Reactions: party popper, clapping hands">
				<span>🎉</span>
				<span>👏</span>
			</caps-bubble-reactions>
		</caps-bubble>
		<caps-bubble variant="destructive">
			<caps-bubble-content>Are you sure I can run this command?</caps-bubble-content>
			<caps-bubble-reactions>
				<button capsButton variant="ghost" size="xs" (click)="onYes()">Yes, run it</button>
			</caps-bubble-reactions>
		</caps-bubble>
	`,
})
export class BubbleReactionsPreview {
	protected onYes(): void {
		toast.success('You clicked yes, running command...');
	}
}
