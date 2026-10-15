import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-message-content',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'message-content' },
	template: `
		<ng-content />
	`,
})
export class CapsMessageContent {
	constructor() {
		classes(
			() =>
				'caps-message-content flex w-full min-w-0 flex-col wrap-break-word group-data-[align=end]/message:*:data-slot:self-end',
		);
	}
}
