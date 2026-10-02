import { ChangeDetectionStrategy, Component, computed, contentChildren, inject, input } from '@angular/core';
import { BrnField } from '@spartan-ng/brain/field';
import { ErrorStateMatcher } from '@spartan-ng/brain/forms';
import { classes } from '@spartan-ng/helm/utils';
import { cva } from 'class-variance-authority';
import { injectCapsFieldParentForm, provideCapsFieldFormContext } from './caps-field-form-context';
import { CapsFieldLabel } from './caps-field-label';

export type CapsFieldOrientation = 'vertical' | 'horizontal' | 'responsive';

const fieldVariants = cva('caps-field group/field flex w-full', {
	variants: {
		orientation: {
			vertical: 'flex-col *:w-full [&>.sr-only]:w-auto',
			horizontal:
				'flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto',
			responsive:
				'flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto',
		},
	},
	defaultVariants: { orientation: 'vertical' },
});

/** A single control with its label, descriptions and validation messages. */
@Component({
	selector: 'caps-field',
	providers: [provideCapsFieldFormContext()],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [{ directive: BrnField, inputs: ['forceInvalid'] }],
	host: {
		role: 'group',
		'data-slot': 'field',
		'[attr.data-orientation]': 'orientation()',
		'[attr.aria-labelledby]': '_labelledBy()',
		'[attr.data-matches-spartan-invalid]': '_matchesInvalid() ? "true" : null',
	},
	template: `
		<ng-content />
	`,
})
export class CapsField {
	private readonly _field = inject(BrnField);
	private readonly _matcher = inject(ErrorStateMatcher);
	private readonly _parentForm = injectCapsFieldParentForm();
	protected readonly _matchesInvalid = computed(() => {
		this._parentForm.events();
		if (this._field.forceInvalid()) return true;
		const state = this._field.controlState();
		const control = this._field.brnFieldControl()?.ngControl?.control ?? null;
		// Include form submission as a dependency without changing Brain's tracker or the control.
		return control ? this._matcher.isInvalid(control, this._parentForm.form) : state?.spartanInvalid;
	});
	/** Stacks the field vertically by default; responsive follows the enclosing FieldGroup width. */
	public readonly orientation = input<CapsFieldOrientation>('vertical');
	private readonly _labels = contentChildren(CapsFieldLabel, { descendants: true });
	protected readonly _labelledBy = computed(() => this._labels()[0]?.id() ?? null);

	constructor() {
		classes(() => fieldVariants({ orientation: this.orientation() }));
	}
}
