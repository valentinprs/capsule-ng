import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChildren } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsSidebarMenuItem } from './caps-sidebar-menu-item';
@Component({
	selector: 'caps-sidebar-menu',
	imports: [NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sidebar-menu', 'data-sidebar': 'menu' },
	template: `
		<ng-content />
		<ul class="caps-sidebar-menu flex w-full min-w-0 flex-col">
			@for (item of _items(); track item) {
				<ng-container [ngTemplateOutlet]="item.template()" />
			}
		</ul>
	`,
})
export class CapsSidebarMenu {
	protected readonly _items = contentChildren(CapsSidebarMenuItem);
	constructor() {
		classes(() => 'block min-w-0');
	}
}
