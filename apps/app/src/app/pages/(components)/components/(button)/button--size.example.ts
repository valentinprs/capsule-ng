import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-size-preview',
	imports: [CapsButtonImports, NgIcon],
	providers: [
		provideIcons({
			lucideArrowUpRight,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex flex-col items-start gap-8 sm:flex-row',
	},
	template: `
		<div class="flex items-start gap-2">
			<button capsButton size="xs" variant="outline">Extra Small</button>
			<button capsButton size="icon-xs" aria-label="Submit" variant="outline">
				<ng-icon name="lucideArrowUpRight" />
			</button>
		</div>
		<div class="flex items-start gap-2">
			<button capsButton size="sm" variant="outline">Small</button>
			<button capsButton size="icon-sm" aria-label="Submit" variant="outline">
				<ng-icon name="lucideArrowUpRight" />
			</button>
		</div>
		<div class="flex items-start gap-2">
			<button capsButton variant="outline">Default</button>
			<button capsButton size="icon" aria-label="Submit" variant="outline">
				<ng-icon name="lucideArrowUpRight" />
			</button>
		</div>
		<div class="flex items-start gap-2">
			<button capsButton variant="outline" size="lg">Large</button>
			<button capsButton size="icon-lg" aria-label="Submit" variant="outline">
				<ng-icon name="lucideArrowUpRight" />
			</button>
		</div>
	`,
})
export class ButtonSizePreview {}
