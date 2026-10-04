import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

/** Noninteractive text projected alongside the group's controls. */
@Component({
	selector: 'caps-button-group-text',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'button-group-text' },
	template: `
		<ng-content />
	`,
})
export class CapsButtonGroupText {
	constructor() {
		classes(() => 'caps-button-group-text flex items-center justify-center [&_ng-icon]:pointer-events-none');
	}
}
