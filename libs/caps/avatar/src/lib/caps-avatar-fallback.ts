import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnAvatarFallback } from '@spartan-ng/brain/avatar';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-avatar-fallback',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnAvatarFallback],
	host: {
		'data-slot': 'avatar-fallback',
	},
	template: '<ng-content />',
})
export class CapsAvatarFallback {
	constructor() {
		classes(
			() =>
				'caps-avatar-fallback flex size-full items-center justify-center text-sm group-data-[size=sm]/avatar:text-xs',
		);
	}
}
