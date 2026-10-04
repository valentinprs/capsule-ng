import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { HlmSpinner } from '@spartan-ng/helm/spinner';

@Component({
	selector: 'spartan-spinner-badge',
	imports: [HlmSpinner, CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex items-center gap-2',
	},
	template: `
		<caps-badge>
			<hlm-spinner class="text-xs" />
			Loading
		</caps-badge>
		<caps-badge variant="gray">
			<hlm-spinner class="text-xs" />
			Syncing
		</caps-badge>
		<caps-badge variant="outline">
			<hlm-spinner class="text-xs" />
			Updating
		</caps-badge>
	`,
})
export class SpinnerBadge {}
