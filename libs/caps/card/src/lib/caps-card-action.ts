import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-card-action',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'card-action' },
	template: `
		<ng-content />
	`,
})
export class CapsCardAction {
	constructor() {
		classes(() => 'caps-card-action col-start-2 row-span-2 row-start-1 block self-start justify-self-end');
	}
}
