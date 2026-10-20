import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/**
 * The application bar. Parts are projected into a fixed layout: menu, visual and title (with the
 * navigation) at the start, actions and the brand logo at the end.
 */
@Component({
	selector: 'caps-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { role: 'banner', 'data-slot': 'header' },
	template: `
		<div class="caps-header-start" data-slot="header-start">
			<ng-content select="caps-header-menu" />
			<ng-content select="caps-header-visual" />
			<div class="caps-header-brand" data-slot="header-brand">
				<ng-content select="caps-header-title" />
				<ng-content select="caps-header-nav" />
			</div>
		</div>
		<div class="caps-header-end" data-slot="header-end">
			<ng-content />
			<ng-content select="caps-header-actions" />
			<ng-content select="caps-header-logo" />
		</div>
	`,
})
export class CapsHeader {
	constructor() {
		classes(() => 'caps-header');
	}
}
