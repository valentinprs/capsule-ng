import { ChangeDetectionStrategy, Component } from '@angular/core';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-skeleton',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { 'data-slot': 'skeleton', 'aria-hidden': 'true' },
	template: '',
})
export class CapsSkeleton {
	constructor() {
		classes(() => 'caps-skeleton');
	}
}
