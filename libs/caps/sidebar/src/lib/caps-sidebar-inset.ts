import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsSidebarService } from './caps-sidebar.service';
@Component({
	selector: 'caps-sidebar-inset',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'sidebar-inset',
		'data-sidebar': 'inset',
		'[attr.data-variant]': '_service.variant()',
		'[attr.data-state]': '_service.state()',
		'[attr.data-mobile]': '_service.isMobile()',
	},
	template: '<ng-content />',
})
export class CapsSidebarInset {
	protected readonly _service = inject(CapsSidebarService);
	constructor() {
		classes(() => 'caps-sidebar-inset relative flex w-full min-w-0 flex-1 flex-col');
	}
}
