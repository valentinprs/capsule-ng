import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/** The application name, truncated when space runs out. */
@Component({
	selector: 'caps-header-title',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'header-title' },
	template: `
		<ng-content />
	`,
})
export class CapsHeaderTitle {
	constructor() {
		classes(() => 'caps-header-title');
	}
}
