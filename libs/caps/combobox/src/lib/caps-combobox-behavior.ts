import { computed, contentChild, Directive, effect, forwardRef, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrnCombobox, provideBrnComboboxBase } from '@spartan-ng/brain/combobox';
import { provideBrnLabelable } from '@spartan-ng/brain/field';
import { CapsComboboxInput } from './caps-combobox-input';
import { CapsComboboxTrigger } from './caps-combobox-trigger';

/** @internal Reuses Brain algorithms, with combined CVA/explicit disabled and native label target. */
@Directive({
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CapsComboboxBehavior), multi: true },
		provideBrnComboboxBase(CapsComboboxBehavior),
		provideBrnLabelable(CapsComboboxBehavior),
	],
})
export class CapsComboboxBehavior<T> extends BrnCombobox<T> {
	private readonly _formDisabled = signal(false);
	public override readonly disabledState = computed(() => this.disabled() || this._formDisabled());
	private readonly _input = contentChild(CapsComboboxInput, { descendants: true });
	private readonly _trigger = contentChild(CapsComboboxTrigger);
	public override readonly labelableId = computed(() => this._trigger()?.buttonId() ?? this._input()?.inputId());
	constructor() {
		super();
		effect(() => this._disabled.set(this.disabledState()));
	}
	public override setDisabledState(disabled: boolean): void {
		this._formDisabled.set(disabled);
		this._disabled.set(this.disabled() || disabled);
	}
}
