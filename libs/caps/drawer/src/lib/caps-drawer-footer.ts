import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';
@Component({
	selector: 'caps-drawer-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'drawer-footer' },
	template: `
		<ng-content />
	`,
})
export class CapsDrawerFooter {
	constructor() {
		classes(() => 'caps-drawer-footer mt-auto flex shrink-0 flex-col');
	}
}
