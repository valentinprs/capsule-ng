import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CapsField } from '@capsule-ng/caps/field';
import { BrnField, BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { BrnRadioGroup } from '@spartan-ng/brain/radio-group';
import { classes } from '@spartan-ng/helm/utils';

/** A native radio selection controlled by Brain's Angular value accessor. */
@Component({
	selector: 'caps-radio-group',
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{ directive: BrnRadioGroup, inputs: ['value', 'name', 'disabled', 'required'], outputs: ['valueChange'] },
		{ directive: BrnFieldControlDescribedBy, inputs: ['aria-describedby'] },
	],
	host: {
		'data-slot': 'radio-group',
		'[attr.aria-labelledby]': 'ariaLabelledby() ?? (ariaLabel() ? null : _capsField?.labelId())',
		'[attr.aria-label]': 'ariaLabel()',
		'[attr.aria-required]': '_group.required()',
		'[attr.aria-disabled]': '_group.disabledState()',
	},
	template: `
		<ng-content />
	`,
})
export class CapsRadioGroup {
	/** The surrounding Field, used to distinguish option Fields from the group Field. */
	protected readonly _capsField = inject(CapsField, { optional: true });
	protected readonly _group = inject(BrnRadioGroup);
	public readonly ariaLabelledby = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	public readonly field = inject(BrnField, { optional: true });
	constructor() {
		classes(() => 'caps-radio-group');
	}
}
