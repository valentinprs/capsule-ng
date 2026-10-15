import { afterNextRender, Directive, effect, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrnCommand, provideBrnCommand } from '@spartan-ng/brain/command';

/** @internal Keeps Brain registration/filtering; bridges native activation and form search. */
@Directive({
	providers: [
		provideBrnCommand(CapsCommandBehavior),
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CapsCommandBehavior), multi: true },
	],
	host: { '(keydown)': 'onActivation($event)', '(focusout)': 'markTouched()' },
})
export class CapsCommandBehavior extends BrnCommand {
	constructor() {
		super();
		afterNextRender(() => this.keyManager.setFirstItemActive());
		effect(() => {
			const search = this.search();
			this._onChange?.(search);
		});
	}
	public override writeValue(value: string | null): void {
		this.search.set(value ?? '');
	}
	// Brain's inherited Enter handler must not also activate a focused native button.
	protected override selectActiveItem(): void {
		return;
	}
	protected onActivation(event: KeyboardEvent): void {
		if (event.key !== 'Enter' || !(event.target instanceof HTMLInputElement)) return;
		event.preventDefault();
		const item = this.keyManager.activeItem;
		if (!this.disabledState() && item && !item.disabled && item.visible()) item.selected.emit();
	}
	protected markTouched(): void {
		this._onTouched?.();
	}
}
