import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/** Holds the primary navigation, usually a `caps-navigation-menu`. Hidden below the `md` breakpoint. */
@Component({
	selector: 'caps-header-nav',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'header-nav' },
	template: `
		<ng-content />
	`,
})
export class CapsHeaderNav {
	constructor() {
		classes(() => 'caps-header-nav');
	}
}
