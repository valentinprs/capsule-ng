import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { HlmBubbleImports } from '@spartan-ng/helm/bubble';

@Component({
	selector: 'spartan-bubble-tooltip-preview',
	imports: [HlmBubbleImports, CapsTooltipImports, CapsButton, NgIcon],
	providers: [provideIcons({ lucideCheck })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-4 py-12',
	},
	template: `
		<div hlmBubble variant="secondary">
			<div hlmBubbleContent>Did you remove the stale route?</div>
		</div>
		<div hlmBubble align="end">
			<div hlmBubbleContent>Yes, removed it from the registry.</div>
			<div hlmBubbleReactions>
				<button
					aria-label="Read status"
					capsTooltip="Read on Jan 5, 2026 at 4:32 PM"
					capsButton
					variant="ghost"
					size="icon-xs"
				>
					<ng-icon name="lucideCheck" />
				</button>
			</div>
		</div>
	`,
})
export class BubbleTooltipPreview {}
