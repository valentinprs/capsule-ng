import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/** Application actions placed before the logo, such as a theme toggle or an account avatar. */
@Component({
	selector: 'caps-header-actions',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'header-actions' },
	template: `
		<ng-content />
	`,
})
export class CapsHeaderActions {
	constructor() {
		classes(() => 'caps-header-actions');
	}
}
