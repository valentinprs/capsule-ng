import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-empty-description',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'empty-description' },
	template: `
		<ng-content />
	`,
})
export class CapsEmptyDescription {
	constructor() {
		classes(() => 'caps-empty-description');
	}
}
