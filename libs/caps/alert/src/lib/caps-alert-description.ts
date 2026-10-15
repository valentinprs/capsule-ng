import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-alert-description',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'alert-description' },
	template: `
		<ng-content />
	`,
})
export class CapsAlertDescription {
	constructor() {
		classes(() => 'caps-alert-description');
	}
}
