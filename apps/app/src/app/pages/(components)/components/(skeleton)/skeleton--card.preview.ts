import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';

import { CapsSkeletonImports } from '@capsule-ng/caps/skeleton';

@Component({
	selector: 'spartan-skeleton-card',
	imports: [CapsSkeletonImports, CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<caps-card class="max-w-xs">
			<caps-card-header>
				<caps-skeleton class="h-4 w-2/3" />
				<caps-skeleton class="h-4 w-1/2" />
			</caps-card-header>
			<caps-card-content>
				<caps-skeleton class="aspect-video w-full" />
			</caps-card-content>
		</caps-card>
	`,
})
export class SkeletonCard {}
