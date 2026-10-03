import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnDialogDescription } from '@spartan-ng/brain/dialog';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-dialog-description',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnDialogDescription],
	host: { 'data-slot': 'dialog-description' },
	template: `
		<ng-content />
	`,
})
export class CapsDialogDescription {
	constructor() {
		classes(() => 'caps-dialog-description');
	}
}
