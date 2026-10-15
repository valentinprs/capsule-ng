import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-bubble-popover-preview',
	imports: [CapsBubbleImports, CapsPopoverImports, CapsButton, NgIcon],
	providers: [provideIcons({ lucideInfo })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-4 py-12',
	},
	template: `
		<caps-bubble align="end">
			<caps-bubble-content>Run the build script.</caps-bubble-content>
		</caps-bubble>
		<caps-bubble variant="destructive">
			<caps-bubble-content>Failed to run the command.</caps-bubble-content>
			<caps-bubble-reactions>
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
			</caps-bubble-reactions>
		</caps-bubble>
	`,
})
export class BubblePopoverPreview {}
