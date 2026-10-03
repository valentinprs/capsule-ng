import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnDialogDescription } from '@spartan-ng/brain/dialog';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-alert-dialog-description',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnDialogDescription],
	host: { 'data-slot': 'alert-dialog-description' },
	template: `
		<ng-content />
	`,
})
export class CapsAlertDialogDescription {
	constructor() {
		classes(() => 'caps-alert-dialog-description');
	}
}
