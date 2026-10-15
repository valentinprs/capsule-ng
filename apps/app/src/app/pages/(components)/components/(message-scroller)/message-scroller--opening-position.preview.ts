import { ChangeDetectionStrategy, Component, effect, input, signal, viewChild } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsMessageScroller, CapsMessageScrollerImports } from '@capsule-ng/caps/message-scroller';
import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';
import { MessageScrollerTranscriptRow } from './message-scroller-transcript-row';
import { OPENING_POSITION_SCRIPT } from './message-scroller.shared';

@Component({
	selector: 'spartan-message-scroller-opening-position-scroller',
	imports: [CapsMessageScrollerImports, MessageScrollerTranscriptRow],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-message-scroller aria-label="Opening position messages" contentClass="p-(--card-spacing)">
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
	`,
})
export class MessageScrollerOpeningPositionScroller {
	private readonly _scroller = viewChild(CapsMessageScroller);

	protected readonly _messages = OPENING_POSITION_SCRIPT;

	public readonly position = input.required<'start' | 'end' | 'last-anchor'>();
	public readonly positionKey = input.required<number>();

	constructor() {
		effect((onCleanup) => {
			const position = this.position();
			const scroller = this._scroller();
			void this.positionKey();

			if (!scroller || typeof window === 'undefined') {
				return;
			}

			// Match shadcn's opening-position demo: drive start/end/last-anchor via
			// commands after layout, not defaultScrollPosition (which can fall back to
			// end when it thinks the last turn fits).
			const frame = requestAnimationFrame(() => {
				if (position === 'start') {
					scroller.scrollToStart({ behavior: 'auto' });
					return;
				}

				if (position === 'end') {
					scroller.scrollToEnd({ behavior: 'auto' });
					return;
				}

				scroller.scrollToMessage('open-3', {
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
	imports: [
		CapsCardImports,
		CapsToggleGroupImports,
		CapsMessageScrollerImports,
		MessageScrollerOpeningPositionScroller,
	],
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
				<spartan-message-scroller-opening-position-scroller [position]="_position()" [positionKey]="_positionKey()" />
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
