import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-sidebar-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sidebar-footer', 'data-sidebar': 'footer' },
	template: '<ng-content />',
})
export class CapsSidebarFooter {
	constructor() {
		classes(() => 'caps-sidebar-footer flex shrink-0 flex-col');
	}
}
