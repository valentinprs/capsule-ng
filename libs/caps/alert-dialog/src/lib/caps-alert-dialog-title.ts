import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnDialogTitle } from '@spartan-ng/brain/dialog';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-alert-dialog-title',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnDialogTitle],
	host: { 'data-slot': 'alert-dialog-title', role: 'heading', 'aria-level': '2' },
	template: `
		<ng-content />
	`,
})
export class CapsAlertDialogTitle {
	constructor() {
		classes(() => 'caps-alert-dialog-title');
	}
}
