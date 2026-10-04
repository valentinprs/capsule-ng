import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-item-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'item-content' },
	template: '<ng-content />',
})
export class CapsItemContent {
	constructor() {
		classes(() => 'caps-item-content flex flex-1 flex-col [&+[data-slot=item-content]]:flex-none');
	}
}
