import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sidebar-menu-skeleton',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sidebar-menu-skeleton', 'data-sidebar': 'menu-skeleton', 'aria-hidden': 'true' },
	template:
		'@if (showIcon()) { <span class="caps-sidebar-menu-skeleton-icon bg-muted" data-sidebar="menu-skeleton-icon"></span> } @else { <span class="caps-sidebar-menu-skeleton-text bg-muted" data-sidebar="menu-skeleton-text"></span> }',
})
export class CapsSidebarMenuSkeleton {
	public readonly showIcon = input(false, { transform: booleanAttribute });
	constructor() {
		classes(() => 'caps-sidebar-menu-skeleton flex items-center');
	}
}
