import { Directive } from '@angular/core';
import { BrnLabel } from '@spartan-ng/brain/label';
import { classes } from '@spartan-ng/helm/utils';

/**
 * Styles a native label while preserving its accessible name and control activation.
 * Brain supplies a generated id and infers the associated control from an optional Field;
 * an explicit `for` value takes precedence.
 */
@Directive({
	selector: 'label[capsLabel]',
	hostDirectives: [{ directive: BrnLabel, inputs: ['id', 'for'] }],
	host: { 'data-slot': 'label' },
})
export class CapsLabel {
	constructor() {
		classes(() => 'caps-label flex items-center select-none peer-disabled:cursor-not-allowed');
	}
}
