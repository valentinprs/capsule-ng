import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sidebar-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sidebar-header', 'data-sidebar': 'header' },
	template: '<ng-content />',
})
export class CapsSidebarHeader {
	constructor() {
		classes(() => 'caps-sidebar-header flex shrink-0 flex-col');
	}
}
