import { ChangeDetectionStrategy, Component, computed, input, viewChild } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsMessageScroller, CapsMessageScrollerImports } from '@capsule-ng/caps/message-scroller';
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
	public readonly scroller = input<CapsMessageScroller>();

	protected readonly _status = computed(() =>
		getScrollStatus(this.scroller()?.scrollable() ?? { start: false, end: false }),
	);
}

@Component({
	selector: 'spartan-message-scroller-scrollable-preview',
	imports: [CapsMessageScrollerImports, CapsCardImports, MessageScrollerTranscriptRow, MessageScrollerScrollableFooter],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'mx-auto flex w-full max-w-sm flex-col gap-4',
	},
	template: `
		<caps-card class="h-[35rem] gap-0 overflow-hidden">
			<caps-card-header class="gap-1 border-b">
				<caps-card-title [level]="3">Scroll Status</caps-card-title>
				<caps-card-description>
					Where the reader can go scroll to based on current scroll position.
				</caps-card-description>
			</caps-card-header>

			<caps-card-content class="flex-1 overflow-hidden p-0">
				<caps-message-scroller
					aria-label="Scrollable messages"
					defaultScrollPosition="start"
					contentClass="gap-4 p-(--card-spacing)"
				>
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

					<button caps-message-scroller-button></button>
				</caps-message-scroller>
			</caps-card-content>

			<caps-card-footer class="text-muted-foreground justify-center border-t text-center text-sm">
				<spartan-message-scroller-scrollable-footer [scroller]="_scroller()" />
			</caps-card-footer>
		</caps-card>

		<div class="text-muted-foreground px-0.5 text-center text-xs">Scroll the transcript to see the footer update.</div>
	`,
})
export class MessageScrollerScrollablePreview {
	protected readonly _scroller = viewChild(CapsMessageScroller);
	protected readonly _messages = createScrollableScript();
}
