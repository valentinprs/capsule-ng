import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sidebar-menu-badge',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sidebar-menu-badge', 'data-sidebar': 'menu-badge' },
	template: '<ng-content />',
})
export class CapsSidebarMenuBadge {
	constructor() {
		classes(() => 'caps-sidebar-menu-badge flex items-center justify-center tabular-nums select-none');
	}
}
