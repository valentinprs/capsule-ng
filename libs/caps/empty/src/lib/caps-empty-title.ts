import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-empty-title',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'empty-title' },
	template: `
		<ng-content />
	`,
})
export class CapsEmptyTitle {
	constructor() {
		classes(() => 'caps-empty-title');
	}
}
