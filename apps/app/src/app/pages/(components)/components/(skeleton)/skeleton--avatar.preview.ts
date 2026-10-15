import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CapsSkeletonImports } from '@capsule-ng/caps/skeleton';

@Component({
	selector: 'spartan-skeleton-avatar',
	imports: [CapsSkeletonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div aria-busy="true" class="flex w-fit items-center gap-4">
			<caps-skeleton class="size-10 shrink-0 rounded-full" />
			<div class="grid gap-2">
				<caps-skeleton class="h-4 w-[150px]" />
				<caps-skeleton class="h-4 w-[100px]" />
			</div>
		</div>
	`,
})
export class SkeletonAvatar {}
