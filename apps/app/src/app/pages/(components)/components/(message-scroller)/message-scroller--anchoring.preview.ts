import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsEmptyImports } from '@capsule-ng/caps/empty';
import { CapsMessageScrollerImports } from '@capsule-ng/caps/message-scroller';
import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp, lucideMessageCircleDashed, lucideRotateCw } from '@ng-icons/lucide';
import { MessageScrollerTranscriptRow } from './message-scroller-transcript-row';
import { ANCHORING_SCRIPT, type DemoMessage } from './message-scroller.shared';

@Component({
	selector: 'spartan-message-scroller-anchoring-preview',
	imports: [
		CapsMessageScrollerImports,
		CapsCardImports,
		CapsButtonImports,
		CapsEmptyImports,
		CapsToggleGroupImports,
		MessageScrollerTranscriptRow,
		NgIcon,
	],
	providers: [provideIcons({ lucideArrowUp, lucideMessageCircleDashed, lucideRotateCw })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'relative flex w-full max-w-sm flex-col gap-4',
	},
	template: `
		<caps-card maxWidth="sm" class="mx-auto h-[35rem] gap-0">
			<caps-card-header class="border-b">
				<caps-card-title [level]="3">Anchoring Turns</caps-card-title>
				<caps-card-description>Choose which role settles near the top edge.</caps-card-description>
				<caps-card-action>
					<button
						capsButton
						type="button"
						variant="outline"
						size="icon"
						aria-label="Reset anchored turns"
						[disabled]="_messages().length === 0"
						(click)="reset()"
					>
						<ng-icon name="lucideRotateCw" />
					</button>
				</caps-card-action>
			</caps-card-header>

			<caps-card-content class="min-h-0 flex-1 overflow-hidden p-0">
				@if (_messages().length === 0) {
					<caps-empty class="h-full">
						<caps-empty-media variant="icon">
							<ng-icon aria-hidden="true" name="lucideMessageCircleDashed" />
						</caps-empty-media>
						<caps-empty-title>No anchored messages yet</caps-empty-title>
						<caps-empty-description>Send the first message to see the selected role anchor.</caps-empty-description>
					</caps-empty>
				} @else {
					<caps-message-scroller aria-label="Anchoring messages" contentClass="p-(--card-spacing)">
						@for (message of _messages(); track message.id) {
							<spartan-message-scroller-transcript-row
								[messageId]="message.id"
								[role]="message.role"
								[text]="message.text"
								[scrollAnchor]="message.role === _anchorRole()"
								userVariant="muted"
								assistantVariant="ghost"
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

			<caps-card-footer>
				<caps-toggle-group
					type="single"
					[spacing]="2"
					[value]="_anchorRole()"
					(valueChange)="onAnchorRoleChange($event)"
					aria-label="Select scroll anchor role"
				>
					<button capsToggleItem value="user" aria-label="Anchor user messages">User</button>
					<button capsToggleItem value="assistant" aria-label="Anchor assistant messages">Assistant</button>
				</caps-toggle-group>
				<button capsButton type="button" size="icon" class="ms-auto" [disabled]="!_nextMessage()" (click)="sendNext()">
					<ng-icon name="lucideArrowUp" />
					<span class="sr-only">Send Message</span>
				</button>
			</caps-card-footer>
		</caps-card>

		<div class="text-muted-foreground mx-auto max-w-xs px-0.5 text-center text-xs">
			Toggle the anchor role, then send messages to compare where turns settle.
		</div>
	`,
})
export class MessageScrollerAnchoringPreview {
	protected readonly _anchorRole = signal<'user' | 'assistant'>('user');
	protected readonly _messages = signal<DemoMessage[]>([]);
	protected readonly _messageIndex = signal(0);

	protected readonly _nextMessage = () => ANCHORING_SCRIPT[this._messageIndex()] ?? null;

	protected onAnchorRoleChange(value: 'user' | 'assistant' | ('user' | 'assistant')[] | null | undefined): void {
		const next = Array.isArray(value) ? value[0] : value;

		if (next === 'user' || next === 'assistant') {
			this._anchorRole.set(next);
		}
	}

	protected reset(): void {
		this._messages.set([]);
		this._messageIndex.set(0);
	}

	protected sendNext(): void {
		const next = this._nextMessage();

		if (!next) {
			return;
		}

		this._messages.update((messages) => [...messages, next]);
		this._messageIndex.update((index) => index + 1);
	}
}
