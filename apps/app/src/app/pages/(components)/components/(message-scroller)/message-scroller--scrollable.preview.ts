import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { injectBrnMessageScroller } from '@spartan-ng/brain/message-scroller';
import { HlmMessageScrollerImports } from '@spartan-ng/helm/message-scroller';
import { MessageScrollerTranscriptRow } from './message-scroller-transcript-row';
import { createScrollableScript } from './message-scroller.shared';

function getScrollStatus({ start, end }: { start: boolean; end: boolean }): string {
	if (start && end) {
		return 'You can scroll both ways.';
	}

	if (end) {
		return 'You are at the top. You can only scroll down.';
	}

	if (start) {
		return 'You are at the bottom. You can only scroll up.';
	}

	return 'All messages fit in the viewport.';
}

@Component({
	selector: 'spartan-message-scroller-scrollable-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		{{ _status() }}
	`,
})
export class MessageScrollerScrollableFooter {
	private readonly _scroller = injectBrnMessageScroller();

	protected readonly _status = computed(() => getScrollStatus(this._scroller.scrollable()));
}

@Component({
	selector: 'spartan-message-scroller-scrollable-preview',
	imports: [HlmMessageScrollerImports, CapsCardImports, MessageScrollerTranscriptRow, MessageScrollerScrollableFooter],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'mx-auto flex w-full max-w-sm flex-col gap-4',
	},
	template: `
		<caps-card class="h-[35rem] w-full gap-0 overflow-hidden">
			<caps-card-header class="gap-1 border-b">
				<caps-card-title [level]="3">Scroll Status</caps-card-title>
				<caps-card-description>
					Where the reader can go scroll to based on current scroll position.
				</caps-card-description>
			</caps-card-header>

			<div hlmMessageScrollerProvider defaultScrollPosition="start">
				<caps-card-content class="flex-1 overflow-hidden p-0">
					<div hlmMessageScroller>
						<div hlmMessageScrollerViewport>
							<div hlmMessageScrollerContent class="gap-4 p-(--card-spacing)">
								@for (message of _messages; track message.id) {
									<spartan-message-scroller-transcript-row
										[messageId]="message.id"
										[role]="message.role"
										[text]="message.text"
										[scrollAnchor]="message.role === 'user'"
										userVariant="muted"
										assistantVariant="ghost"
									/>
								}
							</div>
						</div>
						<button hlmMessageScrollerButton></button>
					</div>
				</caps-card-content>

				<caps-card-footer class="text-muted-foreground justify-center border-t text-center text-sm">
					<spartan-message-scroller-scrollable-footer />
				</caps-card-footer>
			</div>
		</caps-card>

		<div class="text-muted-foreground px-0.5 text-center text-xs">Scroll the transcript to see the footer update.</div>
	`,
})
export class MessageScrollerScrollablePreview {
	protected readonly _messages = createScrollableScript();
}
