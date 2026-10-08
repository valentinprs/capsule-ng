import { Directive, inject, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsSidebarService } from './caps-sidebar.service';
@Directive({
	selector: 'button[capsSidebarRail]',
	host: {
		type: 'button',
		tabindex: '-1',
		'data-slot': 'sidebar-rail',
		'data-sidebar': 'rail',
		'[attr.aria-label]': 'ariaLabel()',
		'(click)': '_service.toggleSidebar()',
	},
})
export class CapsSidebarRail {
	protected readonly _service = inject(CapsSidebarService);
	public readonly ariaLabel = input('Toggle Sidebar', { alias: 'aria-label' });
	constructor() {
		classes(() => 'caps-sidebar-rail absolute inset-y-0 z-20 w-4');
	}
}
