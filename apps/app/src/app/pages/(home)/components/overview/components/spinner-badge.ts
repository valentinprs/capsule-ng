import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { CapsSpinner } from '@capsule-ng/caps/spinner';

@Component({
	selector: 'spartan-spinner-badge',
	imports: [CapsSpinner, CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex items-center gap-2',
	},
	template: `
		<caps-badge>
			<caps-spinner aria-hidden="true" class="text-xs" />
			Loading
		</caps-badge>
		<caps-badge variant="gray">
			<caps-spinner aria-hidden="true" class="text-xs" />
			Syncing
		</caps-badge>
		<caps-badge variant="outline">
			<caps-spinner aria-hidden="true" class="text-xs" />
			Updating
		</caps-badge>
	`,
})
export class SpinnerBadge {}
