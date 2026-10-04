import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-item-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'item-footer' },
	template: '<ng-content />',
})
export class CapsItemFooter {
	constructor() {
		classes(() => 'caps-item-footer flex basis-full items-center justify-between');
	}
}
