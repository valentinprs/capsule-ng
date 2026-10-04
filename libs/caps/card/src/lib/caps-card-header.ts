import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-card-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'card-header' },
	template: `
		<ng-content />
	`,
})
export class CapsCardHeader {
	constructor() {
		classes(
			() =>
				'caps-card-header group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
		);
	}
}
