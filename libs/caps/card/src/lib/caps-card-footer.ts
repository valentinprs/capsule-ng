import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-card-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'card-footer' },
	template: `
		<ng-content />
	`,
})
export class CapsCardFooter {
	constructor() {
		classes(() => 'caps-card-footer flex items-center');
	}
}
