import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';

@Component({
	selector: 'spartan-spinner-badge-preview',
	imports: [CapsSpinnerImports, CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex items-center gap-4 [--radius:1.2rem]">
			<caps-badge>
				<caps-spinner aria-hidden="true" class="text-xs" />
				Syncing
			</caps-badge>
			<caps-badge variant="cool-gray">
				<caps-spinner aria-hidden="true" class="text-xs" />
				Updating
			</caps-badge>
			<caps-badge variant="cool-gray">
				<caps-spinner aria-hidden="true" class="text-xs" />
				Processing
			</caps-badge>
		</div>
	`,
})
export class SpartanSpinnerBadgePreview {}
