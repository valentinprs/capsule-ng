import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';
import { HlmBubbleImports } from '@spartan-ng/helm/bubble';

@Component({
	selector: 'spartan-bubble-popover-preview',
	imports: [HlmBubbleImports, CapsPopoverImports, CapsButton, NgIcon],
	providers: [provideIcons({ lucideInfo })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-4 py-12',
	},
	template: `
		<div hlmBubble align="end">
			<div hlmBubbleContent>Run the build script.</div>
		</div>
		<div hlmBubble variant="destructive">
			<div hlmBubbleContent>Failed to run the command.</div>
			<div hlmBubbleReactions>
				<caps-popover>
					<button
						capsPopoverTrigger
						capsButton
						variant="ghost"
						size="icon-xs"
						aria-label="Show error details"
						class="aria-expanded:text-destructive"
					>
						<ng-icon name="lucideInfo" />
					</button>
					<ng-template capsPopoverContent let-ctx [class]="'w-72'">
						<div class="space-y-1">
							<div class="font-medium">Command failed with exit code 1</div>
							<p class="text-muted-foreground">ENOENT: no such file or directory, open pnpm-lock.yaml</p>
						</div>
					</ng-template>
				</caps-popover>
			</div>
		</div>
	`,
})
export class BubblePopoverPreview {}
