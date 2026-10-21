import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sidebar-menu-badge',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sidebar-menu-badge', 'data-sidebar': 'menu-badge', '[attr.data-variant]': 'variant()' },
	template: '<ng-content />',
})
export class CapsSidebarMenuBadge {
	/** Figma Sidebar Badge `Variant`. */
	public readonly variant = input<'default' | 'primary'>('default');
	constructor() {
		classes(() => 'caps-sidebar-menu-badge flex items-center justify-center tabular-nums select-none');
	}
}
