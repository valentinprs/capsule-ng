import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideRotateCw } from '@ng-icons/lucide';
import { toast } from '@spartan-ng/brain/sonner';
import { HlmMarkerImports } from '@spartan-ng/helm/marker';
import { HlmMessageScrollerImports } from '@spartan-ng/helm/message-scroller';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { MessageScrollerTranscriptRow } from './message-scroller-transcript-row';
import { HISTORY_SCRIPT } from './message-scroller.shared';

const INITIAL_VISIBLE_COUNT = 5;

@Component({
	selector: 'spartan-message-scroller-load-history-preview',
	imports: [
		HlmMessageScrollerImports,
		CapsCardImports,
		CapsButtonImports,
		HlmMarkerImports,
		HlmTooltipImports,
		MessageScrollerTranscriptRow,
		NgIcon,
	],
	providers: [provideIcons({ lucideRotateCw })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'relative flex w-full max-w-sm flex-col gap-4',
	},
	template: `
		<div hlmMessageScrollerProvider>
			<div class="relative flex flex-col gap-4">
				<caps-card class="mx-auto h-[35rem] w-full max-w-sm gap-0">
					<caps-card-header class="gap-1 border-b">
						<caps-card-title [level]="3">Load History</caps-card-title>
						<caps-card-description>Prepended messages keep your place.</caps-card-description>
						<caps-card-action>
							<button
								capsButton
								type="button"
								variant="outline"
								size="icon"
								hlmTooltip="Reset"
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
							<div hlmMessageScroller>
								<div hlmMessageScrollerViewport>
									<div hlmMessageScrollerContent class="p-(--card-spacing)">
										@for (message of _visibleMessages(); track message.id) {
											<spartan-message-scroller-transcript-row
												[messageId]="message.id"
												[role]="message.role"
												[text]="message.text"
												userVariant="muted"
												assistantVariant="ghost"
											/>
										}

										<div hlmMessageScrollerItem [scrollAnchor]="false">
											<div hlmMarker variant="separator">
												<span hlmMarkerContent>End of Conversation</span>
											</div>
										</div>
									</div>
								</div>
								<button hlmMessageScrollerButton></button>
							</div>
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
