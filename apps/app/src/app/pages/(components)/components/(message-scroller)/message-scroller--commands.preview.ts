import { ChangeDetectionStrategy, Component, computed, input, viewChild } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsMessageScroller, CapsMessageScrollerImports } from '@capsule-ng/caps/message-scroller';
import { MessageScrollerTranscriptRow } from './message-scroller-transcript-row';
import { COMMANDS_SCRIPT, trimMessageText } from './message-scroller.shared';

@Component({
	selector: 'spartan-message-scroller-commands-menu',
	imports: [CapsButtonImports, CapsDropdownMenuImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton type="button" variant="secondary" [capsDropdownMenuTrigger]="menu" placement="bottom-end">
			Jump to...
		</button>

		<ng-template #menu>
			<caps-menu class="w-64">
				<caps-menu-group label="Conversations">
					@for (message of _userMessages(); track message.id) {
						<button capsMenuItem (itemClick)="jumpTo(message.id)">
							<span class="line-clamp-1 min-w-0">{{ _trimMessageText(message.text) }}</span>
						</button>
					}
				</caps-menu-group>
			</caps-menu>
		</ng-template>
	`,
})
export class MessageScrollerCommandsMenu {
	public readonly scroller = input<CapsMessageScroller>();

	protected readonly _userMessages = computed(() => COMMANDS_SCRIPT.filter((message) => message.role === 'user'));

	protected readonly _trimMessageText = trimMessageText;

	protected jumpTo(messageId: string): void {
		this.scroller()?.scrollToMessage(messageId, {
			align: 'start',
			behavior: 'smooth',
		});
	}
}

@Component({
	selector: 'spartan-message-scroller-commands-preview',
	imports: [CapsMessageScrollerImports, CapsCardImports, MessageScrollerTranscriptRow, MessageScrollerCommandsMenu],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'relative flex w-full max-w-sm flex-col gap-4',
	},
	template: `
		<div class="relative flex flex-col gap-4">
			<caps-card maxWidth="sm" class="mx-auto h-[35rem] gap-0">
				<caps-card-header class="gap-1 border-b">
					<caps-card-title [level]="3">Commands</caps-card-title>
					<caps-card-description>Drive the transcript from outside.</caps-card-description>
					<caps-card-action>
						<spartan-message-scroller-commands-menu [scroller]="_scroller()" />
					</caps-card-action>
				</caps-card-header>

				<caps-card-content class="flex-1 overflow-hidden p-0">
					<caps-message-scroller
						aria-label="Command navigation messages"
						defaultScrollPosition="end"
						contentClass="p-(--card-spacing)"
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
			</caps-card>
		</div>

		<div class="text-muted-foreground mx-auto max-w-sm px-0.5 text-center text-xs text-balance">
			Use the controls to jump to any message in the conversation.
		</div>
	`,
})
export class MessageScrollerCommandsPreview {
	protected readonly _scroller = viewChild(CapsMessageScroller);
	protected readonly _messages = COMMANDS_SCRIPT;
}
