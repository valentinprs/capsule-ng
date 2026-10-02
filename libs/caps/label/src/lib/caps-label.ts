import { Directive, inject } from '@angular/core';
import { BrnField } from '@spartan-ng/brain/field';
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
	host: { '[attr.data-slot]': '_field ? "field-label" : "label"' },
})
export class CapsLabel {
	protected readonly _field = inject(BrnField, { optional: true });

	constructor() {
		classes(() => [
			'caps-label flex items-center select-none peer-disabled:cursor-not-allowed has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col',
			this._field && 'caps-field-label group/field-label peer/field-label w-fit',
		]);
	}
}
