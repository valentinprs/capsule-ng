import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-item-media',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'item-media' },
	template: '<ng-content />',
})
export class CapsItemMedia {
	constructor() {
		classes(() => 'caps-item-media flex shrink-0 items-center justify-center [&_ng-icon]:pointer-events-none');
	}
}
