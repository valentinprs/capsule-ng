import { computed, contentChild, Directive, effect, forwardRef, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrnAutocompleteSearch, provideBrnAutocompleteBase } from '@spartan-ng/brain/autocomplete';
import { provideBrnLabelable } from '@spartan-ng/brain/field';
import { CapsAutocompleteInput } from './caps-autocomplete-input';

/** @internal Reuses Brain algorithms, with combined CVA/explicit disabled and native label target. */
@Directive({
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CapsAutocompleteSearchBehavior), multi: true },
		provideBrnAutocompleteBase(CapsAutocompleteSearchBehavior),
		provideBrnLabelable(CapsAutocompleteSearchBehavior),
	],
})
export class CapsAutocompleteSearchBehavior<T> extends BrnAutocompleteSearch<T> {
	private readonly _formDisabled = signal(false);
	public override readonly disabledState = computed(() => this.disabled() || this._formDisabled());
	private readonly _input = contentChild(CapsAutocompleteInput, { descendants: true });
	public override readonly labelableId = computed(() => this._input()?.inputId());
	constructor() {
		super();
		effect(() => this._disabled.set(this.disabledState()));
	}
	public override setDisabledState(disabled: boolean): void {
		this._formDisabled.set(disabled);
		this._disabled.set(this.disabled() || disabled);
	}
}
