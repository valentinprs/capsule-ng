import { computed, Directive, effect, forwardRef, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrnComboboxMultiple, provideBrnComboboxBase } from '@spartan-ng/brain/combobox';
import { provideBrnLabelable } from '@spartan-ng/brain/field';

/** @internal Reuses Brain algorithms, with combined CVA/explicit disabled and native label target. */
@Directive({
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CapsComboboxMultipleBehavior), multi: true },
		provideBrnComboboxBase(CapsComboboxMultipleBehavior),
		provideBrnLabelable(CapsComboboxMultipleBehavior),
	],
})
export class CapsComboboxMultipleBehavior<T> extends BrnComboboxMultiple<T> {
	private readonly _formDisabled = signal(false);
	public override readonly disabledState = computed(() => this.disabled() || this._formDisabled());
	constructor() {
		super();
		effect(() => this._disabled.set(this.disabledState()));
	}
	public override setDisabledState(disabled: boolean): void {
		this._formDisabled.set(disabled);
		this._disabled.set(this.disabled() || disabled);
	}
}
