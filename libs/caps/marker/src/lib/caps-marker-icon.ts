import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-marker-icon',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'marker-icon', 'aria-hidden': 'true' },
	template: `
		<ng-content />
	`,
})
export class CapsMarkerIcon {
	constructor() {
		classes(() => 'caps-marker-icon [&_ng-icon:not([class*="text-"])]:text-[length:--spacing(4)]');
	}
}
