import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-empty-actions',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'empty-actions' },
	template: `
		<ng-content />
	`,
})
export class CapsEmptyActions {
	constructor() {
		classes(() => 'caps-empty-actions');
	}
}
