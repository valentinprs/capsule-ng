import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { CapsSpinnerImports } from '@capsule-ng/caps/spinner';

@Component({
	selector: 'spartan-badge-spinner-preview',
	imports: [CapsBadgeImports, CapsSpinnerImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full flex-wrap justify-center gap-2">
			<caps-badge variant="red">
				<caps-spinner aria-hidden="true" class="text-xs" />
				Deleting
			</caps-badge>
			<caps-badge variant="cool-gray">
				Bookmark
				<caps-spinner aria-hidden="true" class="text-xs" />
			</caps-badge>
		</div>
	`,
})
export class BadgeSpinnerPreview {}
