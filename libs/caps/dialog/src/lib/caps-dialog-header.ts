import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-dialog-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'dialog-header' },
	template: `
		<ng-content />
	`,
})
export class CapsDialogHeader {
	constructor() {
		classes(() => 'caps-dialog-header flex flex-col');
	}
}
