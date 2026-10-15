import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-bubble-tooltip-preview',
	imports: [CapsBubbleImports, CapsTooltipImports, CapsButton, NgIcon],
	providers: [provideIcons({ lucideCheck })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-4 py-12',
	},
	template: `
		<caps-bubble variant="secondary">
			<caps-bubble-content>Did you remove the stale route?</caps-bubble-content>
		</caps-bubble>
		<caps-bubble align="end">
			<caps-bubble-content>Yes, removed it from the registry.</caps-bubble-content>
			<caps-bubble-reactions>
				<button
					aria-label="Read status"
					capsTooltip="Read on Jan 5, 2026 at 4:32 PM"
					capsButton
					variant="ghost"
					size="icon-xs"
				>
					<ng-icon name="lucideCheck" />
				</button>
			</caps-bubble-reactions>
		</caps-bubble>
	`,
})
export class BubbleTooltipPreview {}
