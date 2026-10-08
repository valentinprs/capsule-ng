import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-empty-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'empty-content' },
	template: `
		<ng-content />
	`,
})
export class CapsEmptyContent {
	constructor() {
		classes(() => 'caps-empty-content');
	}
}
