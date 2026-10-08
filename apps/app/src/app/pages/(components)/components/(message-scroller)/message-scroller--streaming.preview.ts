import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsEmptyImports } from '@capsule-ng/caps/empty';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
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
import { HlmMessageScrollerImports } from '@spartan-ng/helm/message-scroller';
import { MessageScrollerTranscriptRow } from './message-scroller-transcript-row';
import { MAIN_CHAT_SCRIPT, ScriptedChatRunner } from './message-scroller.shared';

@Component({
	selector: 'spartan-message-scroller-streaming-preview',
	imports: [
		HlmMessageScrollerImports,
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
		<div hlmMessageScrollerProvider autoScroll>
			<caps-card maxWidth="sm" class="mx-auto h-[35rem] gap-0">
				<caps-card-header class="gap-1 border-b">
					<caps-card-title [level]="3">Streaming Messages</caps-card-title>
					<caps-card-description>Auto-scroll follows the live edge of the conversation.</caps-card-description>
					<caps-card-action>
						<button
							capsButton
							variant="outline"
							size="icon"
							capsTooltip="Reset"
							aria-label="Reset stream"
							[disabled]="_chat.messages().length === 0 || _chat.isBusy()"
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
							<caps-empty-title>Ready to Stream</caps-empty-title>
							<caps-empty-description>Press send to stream a scripted launch summary.</caps-empty-description>
						</caps-empty>
					} @else {
						<div hlmMessageScroller>
							<div hlmMessageScrollerViewport>
								<div
									hlmMessageScrollerContent
									class="p-(--card-spacing)"
									[attr.aria-busy]="_chat.isBusy() ? 'true' : null"
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
								</div>
							</div>
							<button hlmMessageScrollerButton></button>
						</div>
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
										<span class="text-muted-foreground">No messages queued. Reset the stream.</span>
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
									placement="bottom-start"
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
				Streaming is simulated.
				<code class="text-xs">autoScroll</code>
				is enabled.
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
export class MessageScrollerStreamingPreview {
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
