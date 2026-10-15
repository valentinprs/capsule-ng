import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CapsSkeletonImports } from '@capsule-ng/caps/skeleton';

@Component({
	selector: 'spartan-skeleton-text',
	imports: [CapsSkeletonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<div aria-busy="true" class="flex w-full max-w-xs flex-col gap-2">
			<caps-skeleton class="h-4 w-full" />
			<caps-skeleton class="h-4 w-full" />
			<caps-skeleton class="h-4 w-3/4" />
		</div>
	`,
})
export class SkeletonText {}
