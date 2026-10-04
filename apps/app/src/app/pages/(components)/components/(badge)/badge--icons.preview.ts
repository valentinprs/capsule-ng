import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck, lucideBookmark } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-badge-icons-preview',
	imports: [CapsBadgeImports, NgIcon],
	providers: [provideIcons({ lucideBadgeCheck, lucideBookmark })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex w-full flex-wrap justify-center gap-2">
			<caps-badge variant="gray">
				<ng-icon name="lucideBadgeCheck" />
				Verified
			</caps-badge>
			<caps-badge variant="outline">
				Bookmark
				<ng-icon name="lucideBookmark" />
			</caps-badge>
		</div>
	`,
})
export class BadgeIconsPreview {}
