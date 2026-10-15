import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sidebar-group-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sidebar-group-content', 'data-sidebar': 'group-content' },
	template: '<ng-content />',
})
export class CapsSidebarGroupContent {
	constructor() {
		classes(() => 'caps-sidebar-group-content w-full');
	}
}
