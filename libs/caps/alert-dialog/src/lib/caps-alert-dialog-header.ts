import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-alert-dialog-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'alert-dialog-header' },
	template: `
		<ng-content />
	`,
})
export class CapsAlertDialogHeader {
	constructor() {
		classes(() => 'caps-alert-dialog-header');
	}
}
