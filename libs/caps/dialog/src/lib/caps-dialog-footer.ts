import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-dialog-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'dialog-footer' },
	template: `
		<ng-content />
	`,
})
export class CapsDialogFooter {
	constructor() {
		classes(() => 'caps-dialog-footer flex flex-col-reverse gap-2 sm:flex-row sm:justify-end');
	}
}
