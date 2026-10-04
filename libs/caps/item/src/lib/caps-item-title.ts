import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-item-title',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'item-title' },
	template: '<ng-content />',
})
export class CapsItemTitle {
	constructor() {
		classes(() => 'caps-item-title line-clamp-1 flex w-fit items-center');
	}
}
