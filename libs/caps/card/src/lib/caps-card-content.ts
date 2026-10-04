import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-card-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'card-content' },
	template: `
		<ng-content />
	`,
})
export class CapsCardContent {
	constructor() {
		classes(() => 'caps-card-content block');
	}
}
