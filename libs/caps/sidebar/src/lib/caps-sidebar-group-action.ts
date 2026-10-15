import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Directive({
	selector: 'button[capsSidebarGroupAction]',
	host: { type: 'button', 'data-slot': 'sidebar-group-action', 'data-sidebar': 'group-action' },
})
export class CapsSidebarGroupAction {
	constructor() {
		classes(() => ['caps-sidebar-group-action flex shrink-0 items-center outline-hidden', '']);
	}
}
