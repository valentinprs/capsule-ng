import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sidebar-separator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'sidebar-separator',
		'data-sidebar': 'separator',
		role: 'separator',
		'aria-orientation': 'horizontal',
	},
	template: '<ng-content />',
})
export class CapsSidebarSeparator {
	constructor() {
		classes(() => 'caps-sidebar-separator block shrink-0');
	}
}
