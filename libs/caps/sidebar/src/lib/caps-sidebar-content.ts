import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sidebar-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sidebar-content', 'data-sidebar': 'content' },
	template: '<ng-content />',
})
export class CapsSidebarContent {
	constructor() {
		classes(() => 'caps-sidebar-content flex min-h-0 flex-1 flex-col overflow-auto');
	}
}
