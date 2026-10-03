import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnDialogTitle } from '@spartan-ng/brain/dialog';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-dialog-title',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnDialogTitle],
	host: { 'data-slot': 'dialog-title', role: 'heading', 'aria-level': '2' },
	template: `
		<ng-content />
	`,
})
export class CapsDialogTitle {
	constructor() {
		classes(() => 'caps-dialog-title');
	}
}
