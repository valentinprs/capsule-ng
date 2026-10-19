import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-badge-link',
	imports: [CapsBadgeImports, RouterLink, NgIcon],
	providers: [provideIcons({ lucideArrowUpRight })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex gap-2">
			<a capsBadge routerLink=".">Angular Route</a>
			<a capsBadge variant="cool-gray" href="/components" target="_blank" rel="noopener noreferrer">
				External Link
				<ng-icon name="lucideArrowUpRight" />
			</a>
		</div>
	`,
})
export class BadgeLink {}
