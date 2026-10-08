import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { CapsMessageScrollerImports } from '@capsule-ng/caps/message-scroller';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideRotateCw } from '@ng-icons/lucide';
import { toast } from '@spartan-ng/brain/sonner';
import { MessageScrollerTranscriptRow } from './message-scroller-transcript-row';
import { HISTORY_SCRIPT } from './message-scroller.shared';

const INITIAL_VISIBLE_COUNT = 5;

@Component({
	selector: 'spartan-message-scroller-load-history-preview',
	imports: [
		CapsMessageScrollerImports,
		CapsCardImports,
		CapsButtonImports,
		CapsMarkerImports,
		CapsTooltipImports,
		MessageScrollerTranscriptRow,
		NgIcon,
	],
	providers: [provideIcons({ lucideRotateCw })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'relative flex w-full max-w-sm flex-col gap-4',
	},
	template: `
		<div class="relative flex flex-col gap-4">
			<caps-card maxWidth="sm" class="mx-auto h-[35rem] gap-0">
				<caps-card-header class="gap-1 border-b">
					<caps-card-title [level]="3">Load History</caps-card-title>
					<caps-card-description>Prepended messages keep your place.</caps-card-description>
					<caps-card-action>
						<button
							capsButton
							type="button"
							variant="outline"
							size="icon"
							capsTooltip="Reset"
							aria-label="Reset loaded messages"
							[disabled]="_visibleCount() === _initialVisibleCount"
							(click)="reset()"
						>
							<ng-icon name="lucideRotateCw" />
						</button>
					</caps-card-action>
				</caps-card-header>

				<caps-card-content class="flex-1 overflow-hidden p-0">
					@for (key of [_demoKey()]; track key) {
						<caps-message-scroller aria-label="History messages" contentClass="p-(--card-spacing)">
							@for (message of _visibleMessages(); track message.id) {
								<spartan-message-scroller-transcript-row
									[messageId]="message.id"
									[role]="message.role"
									[text]="message.text"
									userVariant="muted"
									assistantVariant="ghost"
								/>
							}

							<caps-message-scroller-item [scrollAnchor]="false">
								<caps-marker variant="separator">
									<caps-marker-content>End of Conversation</caps-marker-content>
								</caps-marker>
							</caps-message-scroller-item>

							<button caps-message-scroller-button></button>
						</caps-message-scroller>
					}
				</caps-card-content>

				<caps-card-footer class="flex flex-col items-center gap-2 border-t">
					<button
						capsButton
						type="button"
						class="w-full"
						variant="secondary"
						[disabled]="!_canLoadHistory()"
						(click)="loadHistory()"
					>
						{{ _canLoadHistory() ? 'Load History' : 'History Loaded' }}
					</button>
					<p class="text-muted-foreground text-xs">Restore earlier messages while keeping your place.</p>
				</caps-card-footer>
			</caps-card>
		</div>

		<div class="text-muted-foreground mx-auto max-w-sm px-0.5 text-center text-xs text-balance">
			Click Load History to load the entire conversation
		</div>
	`,
})
export class MessageScrollerLoadHistoryPreview {
	protected readonly _initialVisibleCount = INITIAL_VISIBLE_COUNT;

	protected readonly _demoKey = signal(0);
	protected readonly _visibleCount = signal(INITIAL_VISIBLE_COUNT);

	protected readonly _visibleMessages = computed(() => HISTORY_SCRIPT.slice(-this._visibleCount()));
	protected readonly _canLoadHistory = computed(() => this._visibleCount() < HISTORY_SCRIPT.length);

	protected reset(): void {
		this._visibleCount.set(INITIAL_VISIBLE_COUNT);
		this._demoKey.update((key) => key + 1);
	}

	protected loadHistory(): void {
		if (!this._canLoadHistory()) {
			return;
		}

		this._visibleCount.set(HISTORY_SCRIPT.length);
		toast('History loaded', {
			description: 'Scroll up to see earlier messages.',
		});
	}
}
