import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsMessageScrollerImports } from '@capsule-ng/caps/message-scroller';
import { CapsSliderImports } from '@capsule-ng/caps/slider';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideArrowUp,
	lucideGlobe,
	lucideImage,
	lucidePaperclip,
	lucidePlus,
	lucideRotateCw,
	lucideTelescope,
} from '@ng-icons/lucide';
import { MessageScrollerTranscriptRow } from './message-scroller-transcript-row';
import { MAIN_CHAT_SCRIPT, ScriptedChatRunner } from './message-scroller.shared';

const DEFAULT_PEEK = 64;

@Component({
	selector: 'spartan-message-scroller-previous-context-preview',
	imports: [
		CapsMessageScrollerImports,
		CapsCardImports,
		CapsButtonImports,
		CapsInputGroupImports,
		CapsDropdownMenuImports,
		CapsSliderImports,
		CapsTooltipImports,
		MessageScrollerTranscriptRow,
		NgIcon,
	],
	providers: [
		provideIcons({
			lucideArrowUp,
			lucideGlobe,
			lucideImage,
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
		@for (key of [_demoKey()]; track key) {
			<div class="relative flex flex-col gap-4">
				<caps-card maxWidth="sm" class="mx-auto h-[35rem] gap-0">
					<caps-card-header class="gap-1 border-b">
						<caps-card-title [level]="3">Keeping Context Visible</caps-card-title>
						<caps-card-description>New turns keep part of the previous reply in view.</caps-card-description>
						<caps-card-action>
							<button
								capsButton
								variant="outline"
								size="icon"
								capsTooltip="Reset"
								aria-label="Reset context example"
								[disabled]="_chat.isBusy()"
								(click)="reset()"
							>
								<ng-icon name="lucideRotateCw" />
							</button>
						</caps-card-action>
					</caps-card-header>

					<caps-card-content class="flex-1 overflow-hidden p-0">
						<caps-message-scroller
							aria-label="Previous context messages"
							[scrollMargin]="24"
							[scrollPreviousItemPeek]="_peek()"
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
											<span class="text-muted-foreground">No messages queued. Reset the context.</span>
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
									<div class="flex w-28 items-center gap-2">
										<span class="text-muted-foreground text-xs tabular-nums">{{ _peek() }}px</span>
										<caps-slider
											aria-label="Previous context peek"
											[value]="[_peek()]"
											[min]="64"
											[max]="128"
											[step]="1"
											[disabled]="_chat.isBusy()"
											(valueChange)="onPeekChange($event)"
										/>
									</div>
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
					Adjust the slider and send. Observe the previous message peek
				</div>
			</div>
		}

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
export class MessageScrollerPreviousContextPreview {
	protected readonly _peek = signal(DEFAULT_PEEK);
	protected readonly _demoKey = signal(0);
	protected readonly _chat = new ScriptedChatRunner(MAIN_CHAT_SCRIPT, {
		streamDelayMs: 35,
		thinkDelayMs: 1000,
		initialCount: 2,
	});

	protected readonly _nextPreview = computed(() => this._chat.nextMessage()?.text ?? null);

	protected onPeekChange(value: number[]): void {
		this._peek.set(value[0] ?? DEFAULT_PEEK);
	}

	protected reset(): void {
		this._chat.reset(2);
		this._peek.set(DEFAULT_PEEK);
		this._demoKey.update((key) => key + 1);
	}

	protected send(event: Event): void {
		event.preventDefault();
		if (!this._chat.nextMessage() || this._chat.isBusy()) {
			return;
		}
		void this._chat.sendNext();
	}
}
