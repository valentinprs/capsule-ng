import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sidebar-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sidebar-group', 'data-sidebar': 'group' },
	template: '<ng-content />',
})
export class CapsSidebarGroup {
	constructor() {
		classes(() => 'caps-sidebar-group relative flex w-full min-w-0 flex-col');
	}
}
