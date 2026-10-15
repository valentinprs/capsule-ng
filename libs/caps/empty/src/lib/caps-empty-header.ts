import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-empty-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'empty-header' },
	template: `
		<ng-content />
	`,
})
export class CapsEmptyHeader {
	constructor() {
		classes(() => 'caps-empty-header');
	}
}
