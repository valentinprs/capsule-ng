import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp, lucideMessageCircleDashed, lucideRotateCw } from '@ng-icons/lucide';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmMessageScrollerImports } from '@spartan-ng/helm/message-scroller';
import { MessageScrollerTranscriptRow } from './message-scroller-transcript-row';
import { ANIMATION_SCRIPT, ScriptedChatRunner } from './message-scroller.shared';

type AnimationPreset = {
	id: string;
	name: string;
	className: string;
};

const ANIMATION_PRESETS: AnimationPreset[] = [
	{
		id: 'fade',
		name: 'Fade',
		className: 'motion-safe:animate-in motion-safe:fade-in duration-(--caps-duration-200)',
	},
	{
		id: 'slide-up',
		name: 'Slide Up',
		className:
			'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 duration-(--caps-duration-300)',
	},
	{
		id: 'slide-side',
		name: 'Slide Side',
		className:
			'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-4 duration-(--caps-duration-300)',
	},
	{
		id: 'pop',
		name: 'Pop',
		className:
			'motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:slide-in-from-bottom-2 origin-bottom-right duration-(--caps-duration-300)',
	},
	{
		id: 'spring-bounce',
		name: 'Spring Bounce',
		className:
			'motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:slide-in-from-bottom-3 duration-(--caps-duration-500)',
	},
	{
		id: 'blur-fade',
		name: 'Blur Fade',
		className: 'motion-safe:animate-in motion-safe:fade-in motion-safe:blur-in duration-(--caps-duration-300)',
	},
	{
		id: 'scale-fade',
		name: 'Scale Fade',
		className: 'motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 duration-(--caps-duration-300)',
	},
];
@Component({
	selector: 'spartan-message-scroller-animation-preview',
	imports: [
		HlmMessageScrollerImports,
		CapsCardImports,
		CapsButtonImports,
		HlmEmptyImports,
		CapsSelectImports,
		MessageScrollerTranscriptRow,
		NgIcon,
	],
	providers: [provideIcons({ lucideArrowUp, lucideMessageCircleDashed, lucideRotateCw })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'relative flex w-full max-w-sm flex-col gap-4',
	},
	template: `
		<div class="relative flex flex-col gap-4">
			<caps-card maxWidth="sm" class="mx-auto h-[35rem] gap-0">
				<caps-card-header class="border-b">
					<caps-card-title [level]="3">Animation</caps-card-title>
					<caps-card-description>
						Choose how user messages are animated when they are added to the conversation.
					</caps-card-description>
					<caps-card-action class="flex items-center gap-2">
						<button
							capsButton
							type="button"
							variant="outline"
							size="icon"
							aria-label="Reset animated messages"
							[disabled]="_chat.messages().length === 0 || _chat.isBusy()"
							(click)="reset()"
						>
							<ng-icon name="lucideRotateCw" />
						</button>
					</caps-card-action>
				</caps-card-header>

				<caps-card-content class="min-h-0 flex-1 overflow-hidden p-0">
					@if (_chat.messages().length === 0) {
						<hlm-empty class="h-full">
							<hlm-empty-header>
								<hlm-empty-media variant="icon">
									<ng-icon name="lucideMessageCircleDashed" />
								</hlm-empty-media>
								<div hlmEmptyTitle>No Messages Yet</div>
								<div hlmEmptyDescription>Click the button below to send the first message.</div>
							</hlm-empty-header>
						</hlm-empty>
					} @else {
						<div hlmMessageScrollerProvider>
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
												userVariant="muted"
												assistantVariant="ghost"
												[animationClass]="message.role === 'user' ? _selectedPreset().className : ''"
											/>
										}
									</div>
								</div>
								<button hlmMessageScrollerButton></button>
							</div>
						</div>
					}
				</caps-card-content>

				<caps-card-footer class="border-t">
					<caps-select
						[value]="_presetId()"
						(valueChange)="onPresetChange($event)"
						[itemToString]="_presetToString"
						aria-label="Animation preset"
					>
						@for (preset of _presets; track preset.id) {
							<caps-select-option [value]="preset.id">{{ preset.name }}</caps-select-option>
						}
					</caps-select>

					<button
						capsButton
						type="button"
						size="icon"
						class="ms-auto"
						[disabled]="!_chat.nextMessage() || _chat.isBusy()"
						(click)="sendNext()"
					>
						<ng-icon name="lucideArrowUp" />
						<span class="sr-only">Send Message</span>
					</button>
				</caps-card-footer>
			</caps-card>
		</div>
		<div class="text-muted-foreground mx-auto max-w-sm px-0.5 text-center text-xs text-balance">
			Select an animation then click send to see it in action.
		</div>
	`,
})
export class MessageScrollerAnimationPreview {
	protected readonly _presets = ANIMATION_PRESETS;

	protected readonly _presetId = signal(ANIMATION_PRESETS[0].id);
	protected readonly _chat = new ScriptedChatRunner(ANIMATION_SCRIPT, {
		streamDelayMs: 15,
		thinkDelayMs: 1000,
	});

	protected readonly _selectedPreset = computed(
		() => this._presets.find((preset) => preset.id === this._presetId()) ?? this._presets[0],
	);

	protected readonly _presetToString = (value: string | null | undefined) =>
		this._presets.find((preset) => preset.id === value)?.name ?? '';

	protected onPresetChange(value: string | null | undefined): void {
		if (value) {
			this._presetId.set(value);
		}
	}

	protected reset(): void {
		this._chat.reset();
	}

	protected sendNext(): void {
		if (!this._chat.nextMessage() || this._chat.isBusy()) {
			return;
		}
		void this._chat.sendNext();
	}
}
