import { ChangeDetectionStrategy, Component, computed, effect, input, viewChild } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsHoverCardImports } from '@capsule-ng/caps/hover-card';
import { CapsMessageScroller, CapsMessageScrollerImports } from '@capsule-ng/caps/message-scroller';
import { MessageScrollerTranscriptRow } from './message-scroller-transcript-row';
import { VISIBILITY_SCRIPT, trimMessageText } from './message-scroller.shared';

@Component({
	selector: 'spartan-message-scroller-transcript-outline',
	imports: [CapsHoverCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-hover-card>
			<button
				type="button"
				capsHoverCardTrigger
				placement="left"
				[sideOffset]="-28"
				aria-label="Open transcript outline"
				class="focus-visible:ring-ring/50 flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-md transition-colors outline-none focus-visible:ring-3"
			>
				@for (message of _userMessages(); track message.id) {
					<span
						class="bg-muted-foreground/40 data-[current=true]:bg-foreground h-0.5 w-4 rounded-full"
						[attr.data-current]="message.id === _currentAnchorId()"
					></span>
				}
			</button>
			<ng-template capsHoverCardContent [class]="'flex w-64 flex-col gap-1 rounded-2xl p-1'">
				@for (message of _userMessages(); track message.id) {
					<button
						type="button"
						class="hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground aria-[current=location]:bg-accent aria-[current=location]:text-accent-foreground flex min-h-7 items-center rounded-xl px-2 py-1.5 text-left text-sm transition-colors outline-none"
						[attr.aria-current]="message.id === _currentAnchorId() ? 'location' : null"
						(click)="jumpTo(message.id)"
					>
						<span class="line-clamp-1 min-w-0">{{ _trimMessageText(message.text) }}</span>
					</button>
				}
			</ng-template>
		</caps-hover-card>
	`,
})
export class MessageScrollerTranscriptOutline {
	public readonly scroller = input<CapsMessageScroller>();

	protected readonly _userMessages = computed(() => VISIBILITY_SCRIPT.filter((message) => message.role === 'user'));
	protected readonly _currentAnchorId = computed(() => this.scroller()?.visibility().currentAnchorId ?? null);
	protected readonly _trimMessageText = trimMessageText;

	constructor() {
		effect((onCleanup) => {
			const scroller = this.scroller();
			scroller?.observeVisibility();
			onCleanup(() => scroller?.unobserveVisibility());
		});
	}

	protected jumpTo(messageId: string): void {
		this.scroller()?.scrollToMessage(messageId, {
			align: 'start',
			behavior: 'smooth',
		});
	}
}

@Component({
	selector: 'spartan-message-scroller-visibility-preview',
	imports: [
		CapsMessageScrollerImports,
		CapsCardImports,
		MessageScrollerTranscriptRow,
		MessageScrollerTranscriptOutline,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'relative flex w-full flex-col gap-4 pe-12',
	},
	template: `
		<div class="relative mx-auto w-full max-w-sm">
			<caps-card class="h-[35rem] gap-0">
				<caps-card-header class="gap-1 border-b">
					<caps-card-title [level]="3">Transcript Outline</caps-card-title>
					<caps-card-description>Track the current anchored turn.</caps-card-description>
				</caps-card-header>

				<caps-card-content class="min-h-0 flex-1 overflow-hidden p-0">
					<caps-message-scroller aria-label="Visibility messages" [scrollMargin]="12" contentClass="p-(--card-spacing)">
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
			</caps-card>

			<div class="absolute -end-12 top-1/2 -translate-y-1/2">
				<spartan-message-scroller-transcript-outline [scroller]="_scroller()" />
			</div>
		</div>

		<div class="text-muted-foreground mx-auto max-w-sm px-0.5 text-center text-xs">
			Open the outline to jump between anchored turns as you read.
		</div>
	`,
})
export class MessageScrollerVisibilityPreview {
	protected readonly _scroller = viewChild(CapsMessageScroller);
	protected readonly _messages = VISIBILITY_SCRIPT;
}
