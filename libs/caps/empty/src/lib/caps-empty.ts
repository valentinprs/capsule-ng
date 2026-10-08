import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-empty',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'empty' },
	template: `
		<ng-content />
	`,
})
export class CapsEmpty {
	constructor() {
		classes(() => 'caps-empty');
	}
}
