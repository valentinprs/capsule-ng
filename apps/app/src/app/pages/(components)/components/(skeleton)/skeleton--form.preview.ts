import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CapsSkeletonImports } from '@capsule-ng/caps/skeleton';

@Component({
	selector: 'spartan-skeleton-form',
	imports: [CapsSkeletonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<div aria-busy="true" class="flex w-full max-w-xs flex-col gap-7">
			<div class="flex flex-col gap-3">
				<caps-skeleton class="h-4 w-20" />
				<caps-skeleton class="h-8 w-full" />
			</div>
			<div class="flex flex-col gap-3">
				<caps-skeleton class="h-4 w-24" />
				<caps-skeleton class="h-8 w-full" />
			</div>
			<caps-skeleton class="h-8 w-24" />
		</div>
	`,
})
export class SkeletonForm {}
