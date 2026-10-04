import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrnSeparator } from '@spartan-ng/brain/separator';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-separator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnSeparator, inputs: ['orientation', 'decorative'] }],
	host: { 'data-slot': 'separator' },
	template: ``,
})
export class CapsSeparator {
	constructor() {
		classes(
			() =>
				'caps-separator bg-border inline-flex shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
		);
	}
}
