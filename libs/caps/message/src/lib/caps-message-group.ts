import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-message-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'message-group' },
	template: `
		<ng-content />
	`,
})
export class CapsMessageGroup {
	constructor() {
		classes(() => 'caps-message-group flex min-w-0 flex-col');
	}
}
