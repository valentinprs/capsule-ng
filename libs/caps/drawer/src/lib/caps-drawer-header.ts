import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-drawer-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'drawer-header' },
	template: `
		<ng-content />
	`,
})
export class CapsDrawerHeader {
	constructor() {
		classes(() => 'caps-drawer-header flex shrink-0 flex-col');
	}
}
