import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-item-description',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'item-description' },
	template: '<ng-content />',
})
export class CapsItemDescription {
	constructor() {
		classes(
			() =>
				'caps-item-description [&>a:hover]:text-primary line-clamp-2 flex font-normal [&>a]:underline [&>a]:underline-offset-4',
		);
	}
}
