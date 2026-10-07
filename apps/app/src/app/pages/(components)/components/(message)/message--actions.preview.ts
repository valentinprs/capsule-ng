import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsMessageImports } from '@capsule-ng/caps/message';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCopy, lucideRefreshCcw, lucideThumbsDown, lucideThumbsUp } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-message-actions-preview',
	imports: [CapsMessageImports, CapsBubbleImports, CapsButton, NgIcon],
	providers: [provideIcons({ lucideCopy, lucideThumbsUp, lucideThumbsDown, lucideRefreshCcw })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-message>
			<caps-message-content>
				<caps-bubble variant="muted">
					<caps-bubble-content>The install failure is coming from the workspace package.</caps-bubble-content>
				</caps-bubble>
				<caps-message-footer>
					<button capsButton variant="ghost" size="icon" aria-label="Copy" title="Copy">
						<ng-icon name="lucideCopy" />
					</button>
					<button capsButton variant="ghost" size="icon" aria-label="Like" title="Like">
						<ng-icon name="lucideThumbsUp" />
					</button>
					<button capsButton variant="ghost" size="icon" aria-label="Dislike" title="Dislike">
						<ng-icon name="lucideThumbsDown" />
					</button>
				</caps-message-footer>
			</caps-message-content>
		</caps-message>

		<caps-message align="end">
			<caps-message-content>
				<caps-bubble>
					<caps-bubble-content>Okay drop me a link. Taking a look...</caps-bubble-content>
				</caps-bubble>
				<caps-message-footer class="gap-2">
					<span class="text-destructive font-normal">Failed to send</span>
					<button capsButton variant="ghost" size="icon-xs" title="Retry" aria-label="Retry">
						<ng-icon name="lucideRefreshCcw" />
					</button>
				</caps-message-footer>
			</caps-message-content>
		</caps-message>
	`,
})
export class MessageActionsPreview {}
