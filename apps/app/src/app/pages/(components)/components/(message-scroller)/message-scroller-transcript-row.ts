import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsMessageImports } from '@capsule-ng/caps/message';
import { CapsMessageScrollerItemDirective } from '@capsule-ng/caps/message-scroller';
import { classes } from '@spartan-ng/helm/utils';
import { splitParagraphs } from './message-scroller.shared';

@Component({
	selector: 'spartan-message-scroller-transcript-row',
	imports: [CapsMessageImports, CapsBubbleImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{
			directive: CapsMessageScrollerItemDirective,
			inputs: ['messageId', 'scrollAnchor'],
		},
	],
	host: {
		'data-slot': 'message-scroller-item',
	},
	template: `
		<caps-message [align]="_isUser() ? 'end' : 'start'">
			<caps-message-content>
				<caps-bubble [variant]="_bubbleVariant()">
					<caps-bubble-content [class]="contentClass()">
						@for (paragraph of _paragraphs(); track $index) {
							<p class="whitespace-pre-wrap">{{ paragraph }}</p>
						}
					</caps-bubble-content>
				</caps-bubble>
			</caps-message-content>
		</caps-message>
	`,
})
export class MessageScrollerTranscriptRow {
	public readonly messageId = input.required<string>();
	public readonly role = input.required<'user' | 'assistant'>();
	public readonly text = input.required<string>();
	public readonly scrollAnchor = input(false);
	public readonly userVariant = input<
		'default' | 'muted' | 'ghost' | 'secondary' | 'outline' | 'destructive' | 'tinted'
	>('muted');
	public readonly assistantVariant = input<
		'default' | 'muted' | 'ghost' | 'secondary' | 'outline' | 'destructive' | 'tinted'
	>('ghost');
	public readonly contentClass = input('space-y-2');
	public readonly animationClass = input('');

	protected readonly _isUser = computed(() => this.role() === 'user');
	protected readonly _paragraphs = computed(() => splitParagraphs(this.text()));
	protected readonly _bubbleVariant = computed(() => (this._isUser() ? this.userVariant() : this.assistantVariant()));

	constructor() {
		classes(() =>
			[
				'min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]',
				'block',
				this.animationClass(),
			].filter((value) => Boolean(value)),
		);
	}
}
