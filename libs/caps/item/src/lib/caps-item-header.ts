import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-item-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'item-header' },
	template: '<ng-content />',
})
export class CapsItemHeader {
	constructor() {
		classes(() => 'caps-item-header flex basis-full items-center justify-between');
	}
}
