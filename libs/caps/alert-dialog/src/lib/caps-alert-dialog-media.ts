import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-alert-dialog-media',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'alert-dialog-media' },
	template: `
		<ng-content />
	`,
})
export class CapsAlertDialogMedia {
	constructor() {
		classes(() => 'caps-alert-dialog-media');
	}
}
