import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-marker-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'marker-content' },
	template: `
		<ng-content />
	`,
})
export class CapsMarkerContent {
	constructor() {
		classes(
			() =>
				'caps-marker-content wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center',
		);
	}
}
