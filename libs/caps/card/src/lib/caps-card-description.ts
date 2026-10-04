import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-card-description',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'card-description' },
	template: `
		<ng-content />
	`,
})
export class CapsCardDescription {
	constructor() {
		classes(() => 'caps-card-description block');
	}
}
