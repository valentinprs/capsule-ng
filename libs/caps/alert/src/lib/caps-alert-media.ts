import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-alert-media',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'alert-media' },
	template: `
		<ng-content />
	`,
})
export class CapsAlertMedia {
	constructor() {
		classes(() => 'caps-alert-media');
	}
}
