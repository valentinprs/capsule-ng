import { booleanAttribute, Directive, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Directive({
	selector: 'button[capsSidebarMenuAction]',
	host: { type: 'button', 'data-slot': 'sidebar-menu-action', 'data-sidebar': 'menu-action' },
})
export class CapsSidebarMenuAction {
	public readonly showOnHover = input(false, { transform: booleanAttribute });
	constructor() {
		classes(() => [
			'caps-sidebar-menu-action flex shrink-0 items-center outline-hidden',
			this.showOnHover() && 'caps-sidebar-menu-action-hover',
		]);
	}
}
