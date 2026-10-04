import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-item-actions',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'item-actions' },
	template: '<ng-content />',
})
export class CapsItemActions {
	constructor() {
		classes(() => 'caps-item-actions flex items-center');
	}
}
