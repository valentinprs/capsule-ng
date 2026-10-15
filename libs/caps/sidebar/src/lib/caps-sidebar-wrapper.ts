import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
import { injectCapsSidebarConfig } from './caps-sidebar.token';
@Component({
	selector: 'caps-sidebar-wrapper',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'sidebar-wrapper',
		'data-sidebar': 'wrapper',
		'[style.--sidebar-width]': 'sidebarWidth()',
		'[style.--sidebar-width-icon]': 'sidebarWidthIcon()',
	},
	template: '<ng-content />',
})
export class CapsSidebarWrapper {
	private readonly _config = injectCapsSidebarConfig();
	public readonly sidebarWidth = input<string>(this._config.sidebarWidth);
	public readonly sidebarWidthIcon = input<string>(this._config.sidebarWidthIcon);
	constructor() {
		classes(() => 'caps-sidebar-wrapper group/sidebar-wrapper flex min-h-svh w-full');
	}
}
