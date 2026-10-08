import { Directive } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Directive({
	selector: 'button[capsSidebarGroupLabel]',
	host: { type: 'button', 'data-slot': 'sidebar-group-label', 'data-sidebar': 'group-label' },
})
export class CapsSidebarGroupLabelButton {
	constructor() {
		classes(() => ['caps-sidebar-group-label flex shrink-0 items-center outline-hidden', '']);
	}
}
