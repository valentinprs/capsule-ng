import { ChangeDetectionStrategy, Component, effect, input, signal } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';
import { injectBrnMessageScroller } from '@spartan-ng/brain/message-scroller';
import { HlmMessageScrollerImports } from '@spartan-ng/helm/message-scroller';
import { MessageScrollerTranscriptRow } from './message-scroller-transcript-row';
import { OPENING_POSITION_SCRIPT } from './message-scroller.shared';

@Component({
	selector: 'spartan-message-scroller-opening-position-scroller',
	imports: [HlmMessageScrollerImports, MessageScrollerTranscriptRow],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div hlmMessageScroller>
			<div hlmMessageScrollerViewport>
				<div hlmMessageScrollerContent class="p-(--card-spacing)">
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
	`,
})
export class MessageScrollerOpeningPositionScroller {
	private readonly _scroller = injectBrnMessageScroller();

	protected readonly _messages = OPENING_POSITION_SCRIPT;

	public readonly position = input.required<'start' | 'end' | 'last-anchor'>();
	public readonly positionKey = input.required<number>();

	constructor() {
		effect((onCleanup) => {
			const position = this.position();
			void this.positionKey();

			if (typeof window === 'undefined') {
				return;
			}

			// Match shadcn's opening-position demo: drive start/end/last-anchor via
			// commands after layout, not defaultScrollPosition (which can fall back to
			// end when it thinks the last turn fits).
			const frame = requestAnimationFrame(() => {
				if (position === 'start') {
					this._scroller.scrollToStart({ behavior: 'auto' });
					return;
				}

				if (position === 'end') {
					this._scroller.scrollToEnd({ behavior: 'auto' });
					return;
				}

				this._scroller.scrollToMessage('open-3', {
					align: 'start',
					behavior: 'auto',
					scrollMargin: 64,
				});
			});

			onCleanup(() => cancelAnimationFrame(frame));
		});
	}
}

@Component({
	selector: 'spartan-message-scroller-opening-position-preview',
	imports: [CapsCardImports, CapsToggleGroupImports, HlmMessageScrollerImports, MessageScrollerOpeningPositionScroller],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'relative flex w-full max-w-sm flex-col gap-4',
	},
	template: `
		<caps-card maxWidth="sm" class="mx-auto h-[35rem] gap-0">
			<caps-card-header class="gap-1 border-b">
				<caps-card-title [level]="3">Opening Position</caps-card-title>
				<caps-card-description>Choose where a saved transcript opens.</caps-card-description>
			</caps-card-header>

			<caps-card-content class="min-h-0 flex-1 overflow-hidden p-0">
				<div hlmMessageScrollerProvider>
					<spartan-message-scroller-opening-position-scroller [position]="_position()" [positionKey]="_positionKey()" />
				</div>
			</caps-card-content>

			<caps-card-footer class="flex items-center justify-center border-t">
				<caps-toggle-group
					type="single"
					[nullable]="false"
					aria-label="Transcript opening position"
					[value]="_position()"
					(valueChange)="onPositionChange($event)"
				>
					<button capsToggleItem value="start">start</button>
					<button capsToggleItem value="end">end</button>
					<button capsToggleItem value="last-anchor">last-anchor</button>
				</caps-toggle-group>
			</caps-card-footer>
		</caps-card>

		<div class="text-muted-foreground mx-auto max-w-sm px-0.5 text-center text-xs">
			Toggle the defaultScrollPosition to see where the transcript starts when you open the thread
		</div>
	`,
})
export class MessageScrollerOpeningPositionPreview {
	protected readonly _position = signal<'start' | 'end' | 'last-anchor'>('last-anchor');
	protected readonly _positionKey = signal(0);

	protected onPositionChange(value: string | string[] | null | undefined): void {
		if (value === 'start' || value === 'end' || value === 'last-anchor') {
			this._position.set(value);
			this._positionKey.update((key) => key + 1);
		}
	}
}
