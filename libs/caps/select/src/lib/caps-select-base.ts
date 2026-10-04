import { booleanAttribute, computed, contentChild, contentChildren, Directive, inject, input } from '@angular/core';
import { BrnSelect, BrnSelectMultiple } from '@spartan-ng/brain/select';
import { CapsSelectOption } from './caps-select-option';
import { CapsSelectPlaceholder, CapsSelectValue } from './caps-select-value';

@Directive()
export abstract class CapsSelectBase<T> {
	protected readonly _select =
		inject<BrnSelect<T>>(BrnSelect, { optional: true }) ?? inject<BrnSelectMultiple<T>>(BrnSelectMultiple);
	protected readonly _options = contentChildren<CapsSelectOption<T>>(CapsSelectOption, { descendants: true });
	protected readonly _valueTemplate = contentChild(CapsSelectValue);
	protected readonly _placeholderTemplate = contentChild(CapsSelectPlaceholder);
	public readonly panelClass = input('');
	public readonly triggerClass = input('');
	public readonly dir = input<'ltr' | 'rtl' | 'auto'>('auto');
	private _touch?: () => void;
	constructor() {
		// Adapt the public CVA callback so tabbing away also completes updateOn: 'blur' controls.
		const register = this._select.registerOnTouched.bind(this._select);
		this._select.registerOnTouched = (callback) => {
			this._touch = callback;
			register(callback);
		};
	}
	protected _blur() {
		this._touch?.();
	}
	public readonly placeholder = input('');
	private static _nextId = 0;
	public readonly id = input<string>(`caps-select-${++CapsSelectBase._nextId}`);
	public readonly size = input<'default' | 'sm'>('default');
	public readonly forceInvalid = input(false, { transform: booleanAttribute });
	public readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });
	public readonly ariaInvalid = input<boolean | undefined, boolean | string | undefined>(undefined, {
		alias: 'aria-invalid',
		transform: (v) => (v === undefined ? undefined : booleanAttribute(v)),
	});
	protected readonly _display = computed(() => {
		const value = this._select.value();
		if (!this._select.hasValue()) return this.placeholder();
		const label = (value: T) => {
			const option = this._options().find((option) => this._select.isItemEqualToValue()(option.item.value(), value));
			return this._select.itemToString()?.(value) ?? option?.label() ?? (option?.text() || String(value));
		};
		return Array.isArray(value) ? value.map(label).join(', ') : label(value as T);
	});
}
