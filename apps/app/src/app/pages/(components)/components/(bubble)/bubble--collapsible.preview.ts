import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';

const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`;

const previewLength = 180;

@Component({
	selector: 'spartan-bubble-collapsible-preview',
	imports: [CapsBubbleImports, CapsButton, NgIcon],
	providers: [provideIcons({ lucideChevronDown })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-bubble variant="muted">
			<caps-bubble-content>How can I help you today?</caps-bubble-content>
		</caps-bubble>

		<caps-bubble variant="muted" align="end">
			<caps-bubble-content class="whitespace-pre-line">
				<div>{{ _open() || !_isLong ? _text : _preview }}</div>
				@if (_isLong) {
					<button
						capsButton
						variant="link"
						class="text-muted-foreground gap-1 p-0"
						[attr.aria-expanded]="_open()"
						(click)="_open.set(!_open())"
					>
						{{ _open() ? 'Show less' : 'Show more' }}
						<ng-icon name="lucideChevronDown" class="transition-transform" [class.rotate-180]="_open()" />
					</button>
				}
			</caps-bubble-content>
		</caps-bubble>
	`,
})
export class BubbleCollapsiblePreview {
	protected readonly _open = signal(false);
	protected readonly _text = text;
	protected readonly _isLong = text.length > previewLength;
	protected readonly _preview = `${text.slice(0, previewLength)}...`;
}
