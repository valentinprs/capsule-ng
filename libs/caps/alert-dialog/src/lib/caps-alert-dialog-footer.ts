import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-alert-dialog-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'alert-dialog-footer' },
	template: `
		<ng-content />
	`,
})
export class CapsAlertDialogFooter {
	constructor() {
		classes(
			() =>
				'caps-alert-dialog-footer flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end',
		);
	}
}
