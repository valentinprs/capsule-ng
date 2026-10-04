import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBot, lucideChevronDown } from '@ng-icons/lucide';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { HlmTextarea } from '@spartan-ng/helm/textarea';

@Component({
	selector: 'spartan-button-group-popover',
	imports: [CapsButtonGroupImports, HlmPopoverImports, HlmTextarea, CapsButton, NgIcon],
	providers: [provideIcons({ lucideBot, lucideChevronDown })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<hlm-popover sideOffset="5" align="end">
			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline" size="sm">
					<ng-icon name="lucideBot" />
					Copilot
				</button>
				<button aria-label="Open agent tasks" hlmPopoverTrigger capsButton variant="outline" size="icon-sm">
					<ng-icon name="lucideChevronDown" />
				</button>
				<hlm-popover-content class="rounded-xl p-0 text-sm" *hlmPopoverPortal="let ctx">
					<div class="border-input border-b px-4 py-3">
						<div class="text-sm font-medium">Agent Tasks</div>
					</div>
					<div class="p-4 text-sm">
						<textarea
							hlmTextarea
							aria-label="Task description"
							placeholder="Describe your task in natural language."
							class="mb-4 min-h-16 resize-none"
						></textarea>
						<p class="mb-2 font-medium">Start a new task with Copilot</p>
						<p class="text-muted-foreground">
							Describe your task in natural language. Copilot will work in the background and open a pull request for
							your review.
						</p>
					</div>
				</hlm-popover-content>
			</caps-button-group>
		</hlm-popover>
	`,
})
export class ButtonGroupPopover {}
