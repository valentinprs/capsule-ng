import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-alert-title',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'alert-title' },
	template: `
		<ng-content />
	`,
})
export class CapsAlertTitle {
	constructor() {
		classes(() => 'caps-alert-title');
	}
}
