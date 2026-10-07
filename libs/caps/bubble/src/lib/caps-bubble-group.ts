import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-bubble-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'bubble-group' },
	template: `
		<ng-content />
	`,
})
export class CapsBubbleGroup {
	constructor() {
		classes(() => 'caps-bubble-group flex min-w-0 flex-col');
	}
}
