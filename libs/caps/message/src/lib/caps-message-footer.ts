import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-message-footer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'message-footer' },
	template: `
		<ng-content />
	`,
})
export class CapsMessageFooter {
	constructor() {
		classes(
			() =>
				'caps-message-footer flex max-w-full min-w-0 items-center group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end',
		);
	}
}
