import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsMessageImports } from '@capsule-ng/caps/message';

@Component({
	selector: 'spartan-message-header-footer-preview',
	imports: [CapsMessageImports, CapsBubbleImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-message>
			<caps-message-content>
				<caps-message-header>Olivia</caps-message-header>
				<caps-bubble variant="muted">
					<caps-bubble-content>I already checked the logs.</caps-bubble-content>
				</caps-bubble>
			</caps-message-content>
		</caps-message>

		<caps-message align="end">
			<caps-message-content>
				<caps-bubble>
					<caps-bubble-content>Send the report to the team. Ping &#64;spartan if you need help.</caps-bubble-content>
				</caps-bubble>
				<caps-message-footer>
					<div>
						Read
						<time datetime="2026-10-06" class="font-normal">Yesterday</time>
					</div>
				</caps-message-footer>
			</caps-message-content>
		</caps-message>
	`,
})
export class MessageHeaderFooterPreview {}
