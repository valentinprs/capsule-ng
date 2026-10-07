import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnDialogDescription } from '@spartan-ng/brain/dialog';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-drawer-description',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnDialogDescription],
	host: { 'data-slot': 'drawer-description' },
	template: `
		<ng-content />
	`,
})
export class CapsDrawerDescription {
	constructor() {
		classes(() => 'caps-drawer-description');
	}
}
