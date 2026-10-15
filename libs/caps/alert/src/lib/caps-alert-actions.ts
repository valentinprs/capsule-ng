import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-alert-actions',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'alert-actions' },
	template: `
		<ng-content />
	`,
})
export class CapsAlertActions {
	constructor() {
		classes(() => 'caps-alert-actions');
	}
}
