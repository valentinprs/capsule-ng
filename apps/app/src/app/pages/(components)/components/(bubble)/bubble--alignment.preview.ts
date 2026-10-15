import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';

@Component({
	selector: 'spartan-bubble-alignment-preview',
	imports: [CapsBubbleImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-bubble variant="muted">
			<caps-bubble-content>This bubble is aligned to the start. This is the default alignment.</caps-bubble-content>
		</caps-bubble>
		<caps-bubble align="end">
			<caps-bubble-content>This bubble is aligned to the end. Use this for user messages.</caps-bubble-content>
		</caps-bubble>
	`,
})
export class BubbleAlignmentPreview {}
