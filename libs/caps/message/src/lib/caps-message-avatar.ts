import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-message-avatar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'message-avatar' },
	template: `
		<ng-content />
	`,
})
export class CapsMessageAvatar {
	constructor() {
		classes(
			() =>
				'caps-message-avatar flex w-fit shrink-0 items-center justify-center self-end overflow-hidden group-has-data-[slot=message-footer]/message:-translate-y-8',
		);
	}
}
