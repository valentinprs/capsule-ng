import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { HlmSpinnerImports } from '@spartan-ng/helm/spinner';

@Component({
	selector: 'spartan-badge-spinner-preview',
	imports: [CapsBadgeImports, HlmSpinnerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full flex-wrap justify-center gap-2">
			<caps-badge variant="red">
				<hlm-spinner class="text-xs" />
				Deleting
			</caps-badge>
			<caps-badge variant="outline">
				Bookmark
				<hlm-spinner class="text-xs" />
			</caps-badge>
		</div>
	`,
})
export class BadgeSpinnerPreview {}
