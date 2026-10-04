import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';
import { CapsTextarea } from '@capsule-ng/caps/textarea';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBot, lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';

@Component({
	selector: 'spartan-button-group-popover',
	imports: [HlmButtonGroupImports, CapsPopoverImports, CapsTextarea, CapsButton, NgIcon],
	providers: [provideIcons({ lucideBot, lucideChevronDown })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-popover placement="bottom-end">
			<div hlmButtonGroup>
				<button capsButton variant="outline" size="sm">
					<ng-icon name="lucideBot" />
					Copilot
				</button>
				<button
					id="edit-profile"
					aria-label="More Copilot options"
					capsPopoverTrigger
					capsButton
					variant="outline"
					size="icon-sm"
				>
					<ng-icon name="lucideChevronDown" />
				</button>
				<ng-template capsPopoverContent let-ctx [class]="'rounded-xl p-0 text-sm'">
					<div class="border-input border-b px-4 py-3">
						<div class="text-sm font-medium">Agent Tasks</div>
					</div>
					<div class="p-4 text-sm">
						<textarea
							capsTextarea
							placeholder="Describe your task in natural language."
							class="mb-4 min-h-16 resize-none"
						></textarea>
						<p class="mb-2 font-medium">Start a new task with Copilot</p>
						<p class="text-muted-foreground">
							Describe your task in natural language. Copilot will work in the background and open a pull request for
							your review.
						</p>
					</div>
				</ng-template>
			</div>
		</caps-popover>
	`,
})
export class ButtonGroupPopover {}
