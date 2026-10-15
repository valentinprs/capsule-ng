import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-message-header',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'message-header' },
	template: `
		<ng-content />
	`,
})
export class CapsMessageHeader {
	constructor() {
		classes(
			() => 'caps-message-header flex max-w-full min-w-0 items-center group-has-data-[variant=ghost]/message:px-0',
		);
	}
}
