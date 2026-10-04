import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';

@Component({
	selector: 'spartan-spinner-badge-preview',
	imports: [HlmSpinnerImports, CapsBadgeImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex items-center gap-4 [--radius:1.2rem]">
			<caps-badge>
				<hlm-spinner class="text-xs" />
				Syncing
			</caps-badge>
			<caps-badge variant="gray">
				<hlm-spinner class="text-xs" />
				Updating
			</caps-badge>
			<caps-badge variant="outline">
				<hlm-spinner class="text-xs" />
				Processing
			</caps-badge>
		</div>
	`,
})
export class SpartanSpinnerBadgePreview {}
