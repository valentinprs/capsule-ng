import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BrnSeparator } from '@spartan-ng/brain/separator';
import { classes } from '@spartan-ng/helm/utils';

@Component({
	selector: 'caps-separator',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnSeparator, inputs: ['orientation', 'decorative'] }],
	host: { 'data-slot': 'separator', '[attr.data-spacing]': 'spacing()' },
	template: ``,
})
export class CapsSeparator {
	/** Figma Separator `Spacing`: the margin on each side of the line. */
	public readonly spacing = input<'none' | 'regular' | 'spacious'>('none');
	constructor() {
		classes(
			() =>
				'caps-separator bg-border inline-flex shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch',
		);
	}
}
