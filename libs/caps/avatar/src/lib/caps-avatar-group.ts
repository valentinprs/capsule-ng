import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-avatar-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'avatar-group',
	},
	template: '<ng-content />',
})
export class CapsAvatarGroup {
	constructor() {
		classes(
			() => '*:data-[slot=avatar]:ring-background group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2',
		);
	}
}
