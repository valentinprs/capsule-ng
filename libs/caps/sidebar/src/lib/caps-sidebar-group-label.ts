import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sidebar-group-label',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sidebar-group-label', 'data-sidebar': 'group-label' },
	template: '<ng-content />',
})
export class CapsSidebarGroupLabel {
	constructor() {
		classes(() => 'caps-sidebar-group-label flex shrink-0 items-center');
	}
}
