import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { hlmCode } from '@spartan-ng/helm/typography';

@Component({
	selector: 'spartan-bubble-variants-preview',
	imports: [CapsBubbleImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-12 py-12',
	},
	template: `
		<caps-bubble>
			<caps-bubble-content>This is the default primary bubble.</caps-bubble-content>
		</caps-bubble>
		<caps-bubble variant="secondary" align="end">
			<caps-bubble-content>This is the secondary variant.</caps-bubble-content>
		</caps-bubble>
		<caps-bubble variant="muted">
			<caps-bubble-content>This one is muted. It uses a lower emphasis color for the chat bubble.</caps-bubble-content>
			<caps-bubble-reactions role="img" aria-label="Reaction: thumbs up">
				<span>👍</span>
			</caps-bubble-reactions>
		</caps-bubble>
		<caps-bubble variant="tinted" align="end">
			<caps-bubble-content>
				This one is tinted. The tint is a softer color derived from the primary color.
			</caps-bubble-content>
		</caps-bubble>
		<caps-bubble variant="outline">
			<caps-bubble-content>We can also use an outlined variant.</caps-bubble-content>
		</caps-bubble>
		<caps-bubble variant="destructive" align="end">
			<caps-bubble-content>Or a destructive variant with a reaction.</caps-bubble-content>
			<caps-bubble-reactions role="img" aria-label="Reaction: fire">
				<span>🔥</span>
			</caps-bubble-reactions>
		</caps-bubble>
		<caps-bubble variant="ghost">
			<caps-bubble-content class="space-y-4">
				<p>
					Ghost bubbles work for assistant text,
					<strong>markdown</strong>
					, and other content that should not be framed.
				</p>
				<p>
					This is perfect for assistant messages that should not have a frame and can take the full width of the
					container. You can also render
					<code class="${hlmCode}">code</code>
					in it.
				</p>
				<p>Ghost bubbles are full width and can take the full width of the container.</p>
			</caps-bubble-content>
		</caps-bubble>
	`,
})
export class BubbleVariantsPreview {}
