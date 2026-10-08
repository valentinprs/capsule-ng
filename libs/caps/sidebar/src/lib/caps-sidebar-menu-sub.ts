import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChildren } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { CapsSidebarMenuSubItem } from './caps-sidebar-menu-sub-item';
@Component({
	selector: 'caps-sidebar-menu-sub',
	imports: [NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'sidebar-menu-sub', 'data-sidebar': 'menu-sub' },
	template: `
		<ng-content />
		<ul class="caps-sidebar-menu-sub flex w-full min-w-0 flex-col">
			@for (item of _items(); track item) {
				<ng-container [ngTemplateOutlet]="item.template()" />
			}
		</ul>
	`,
})
export class CapsSidebarMenuSub {
	protected readonly _items = contentChildren(CapsSidebarMenuSubItem);
	constructor() {
		classes(() => 'block min-w-0');
	}
}
