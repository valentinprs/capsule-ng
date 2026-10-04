import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-avatar-badge',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'avatar-badge',
	},
	template: '<ng-content />',
})
export class CapsAvatarBadge {
	constructor() {
		classes(() => [
			'caps-avatar-badge absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-blend-color ring-2 select-none',
			'group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>ng-icon]:hidden',
			'group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>ng-icon]:text-[length:--spacing(2)]',
			'group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>ng-icon]:text-[length:--spacing(2)]',
		]);
	}
}
