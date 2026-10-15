import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsEmptyImports } from '@capsule-ng/caps/empty';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsMessageScrollerImports } from '@capsule-ng/caps/message-scroller';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideArrowUp,
	lucideGlobe,
	lucideImage,
	lucideMessageCircleDashed,
	lucidePaperclip,
	lucidePlus,
	lucideRotateCw,
	lucideTelescope,
} from '@ng-icons/lucide';
import { MessageScrollerTranscriptRow } from './message-scroller-transcript-row';
import { MAIN_CHAT_SCRIPT, ScriptedChatRunner } from './message-scroller.shared';

@Component({
	selector: 'spartan-message-scroller-preview',
	imports: [
		CapsMessageScrollerImports,
		CapsCardImports,
		CapsButtonImports,
		CapsEmptyImports,
		CapsInputGroupImports,
		CapsDropdownMenuImports,
		CapsTooltipImports,
		MessageScrollerTranscriptRow,
		NgIcon,
	],
	providers: [
		provideIcons({
			lucideArrowUp,
			lucideGlobe,
			lucideImage,
			lucideMessageCircleDashed,
			lucidePaperclip,
			lucidePlus,
			lucideRotateCw,
			lucideTelescope,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'relative flex w-full max-w-sm flex-col gap-4',
	},
	template: `
		<div class="relative flex flex-col gap-4">
			<caps-card maxWidth="sm" class="mx-auto h-[35rem] gap-0">
				<caps-card-header class="gap-1 border-b">
					<caps-card-title [level]="2">New Chat</caps-card-title>
					<caps-card-description>How can I help you today?</caps-card-description>
					<caps-card-action>
						<button
							capsButton
							type="button"
							variant="outline"
							size="icon"
							capsTooltip="Reset"
							aria-label="Reset conversation"
							[disabled]="_chat.isBusy()"
							(click)="reset()"
						>
							<ng-icon name="lucideRotateCw" />
						</button>
					</caps-card-action>
				</caps-card-header>

				<caps-card-content class="min-h-0 flex-1 overflow-hidden p-0">
					@if (_chat.messages().length === 0) {
						<caps-empty class="h-full">
							<caps-empty-media variant="icon">
								<ng-icon aria-hidden="true" name="lucideMessageCircleDashed" />
							</caps-empty-media>
							<caps-empty-title>Morning, shadcn!</caps-empty-title>
							<caps-empty-description>
								What are we working on today? Press send to start a new conversation
							</caps-empty-description>
						</caps-empty>
					} @else {
						<caps-message-scroller
							aria-label="New chat messages"
							contentClass="p-(--card-spacing)"
							[aria-busy]="_chat.isBusy()"
							[announcement]="_chat.status() === 'ready' && _chat.messages().length ? 'Reply complete' : ''"
						>
							@for (message of _chat.messages(); track message.id) {
								<spartan-message-scroller-transcript-row
									[messageId]="message.id"
									[role]="message.role"
									[text]="message.text"
									[scrollAnchor]="message.role === 'user'"
									[animationClass]="
										message.role === 'user'
											? 'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 duration-(--caps-duration-300)'
											: ''
									"
								/>
							}

							<button caps-message-scroller-button></button>
						</caps-message-scroller>
					}
				</caps-card-content>

				<caps-card-footer class="flex-col gap-2">
					<form class="w-full" (submit)="send($event)">
						<caps-input-group>
							<div class="h-14 w-full px-3 py-2.5">
								<span
									class="line-clamp-2 opacity-(--caps-opacity-60) data-[status=ready]:opacity-100"
									[attr.data-status]="_chat.status()"
								>
									@if (_nextPreview(); as preview) {
										{{ preview }}
									} @else {
										<span class="text-muted-foreground">No messages queued. Reset the conversation.</span>
									}
								</span>
							</div>
							<caps-input-group-addon align="block-end" class="pt-1">
								<button
									capsButton
									type="button"
									size="icon-sm"
									variant="outline"
									aria-label="Add files"
									[capsDropdownMenuTrigger]="attachmentMenu"
									placement="top-start"
								>
									<ng-icon name="lucidePlus" />
								</button>
								<button
									capsButton
									type="submit"
									variant="default"
									size="icon-sm"
									class="ms-auto"
									[disabled]="!_chat.nextMessage() || _chat.isBusy()"
								>
									<ng-icon name="lucideArrowUp" />
									<span class="sr-only">Send</span>
								</button>
							</caps-input-group-addon>
						</caps-input-group>
					</form>
				</caps-card-footer>
			</caps-card>

			<div class="text-muted-foreground px-0.5 text-center text-xs">
				Demo is read only. Press send to send messages.
			</div>
		</div>

		<ng-template #attachmentMenu>
			<caps-menu class="w-44">
				<button capsMenuItem>
					<ng-icon name="lucidePaperclip" />
					Add Photos &amp; Files
				</button>
				<caps-menu-separator />
				<button capsMenuItem>
					<ng-icon name="lucideImage" />
					Create Image
				</button>
				<button capsMenuItem>
					<ng-icon name="lucideTelescope" />
					Deep Research
				</button>
				<button capsMenuItem>
					<ng-icon name="lucideGlobe" />
					Web Search
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class MessageScrollerPreview {
	protected readonly _chat = new ScriptedChatRunner(MAIN_CHAT_SCRIPT, {
		streamDelayMs: 20,
		thinkDelayMs: 1000,
	});

	protected readonly _nextPreview = computed(() => this._chat.nextMessage()?.text ?? null);

	protected reset(): void {
		this._chat.reset();
	}

	protected send(event: Event): void {
		event.preventDefault();
		if (!this._chat.nextMessage() || this._chat.isBusy()) {
			return;
		}
		void this._chat.sendNext();
	}
}

export const defaultImports = `
import { CapsMessageScrollerImports } from '@capsule-ng/caps/message-scroller';
`;

export const defaultSkeleton = `
<caps-message-scroller aria-label="New chat messages" class="h-96" [autoScroll]="true" aria-label="Conversation">
  @for (message of messages; track message.id) {
    <caps-message-scroller-item [messageId]="message.id" [scrollAnchor]="message.role === 'user'">
      <!-- Compose public Message / Bubble / Marker here. -->
    </caps-message-scroller-item>
  }
  <button caps-message-scroller-button type="button" aria-label="Return to latest messages"></button>
</caps-message-scroller>
`;
