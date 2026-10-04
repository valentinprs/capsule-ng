import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';

import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';

@Component({
	selector: 'spartan-skeleton-card',
	imports: [HlmSkeletonImports, CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<caps-card class="max-w-xs">
			<caps-card-header>
				<hlm-skeleton class="h-4 w-2/3" />
				<hlm-skeleton class="h-4 w-1/2" />
			</caps-card-header>
			<caps-card-content>
				<hlm-skeleton class="aspect-video w-full" />
			</caps-card-content>
		</caps-card>
	`,
})
export class SkeletonCard {}
