import type { BooleanInput } from '@angular/cdk/coercion';
import {
	afterRenderEffect,
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	forwardRef,
	inject,
	input,
	linkedSignal,
	model,
	output,
	Renderer2,
	viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideMinus } from '@ng-icons/lucide';
import { BrnCheckbox } from '@spartan-ng/brain/checkbox';
import { BrnFieldA11yService, BrnFieldControl } from '@spartan-ng/brain/field';
import { type ChangeFn, type TouchFn } from '@spartan-ng/brain/forms';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

/** A styled Brain checkbox with a native interactive button and Angular forms support. */
@Component({
	selector: 'caps-checkbox',
	imports: [BrnCheckbox, NgIcon],
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CapsCheckbox), multi: true }],
	viewProviders: [provideIcons({ lucideCheck, lucideMinus })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnFieldControl],
	host: {
		class: 'inline-flex shrink-0 peer',
		'data-slot': 'checkbox',
		'[attr.id]': 'null',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
		'[attr.data-disabled]': '_disabled() ? "true" : null',
		'[attr.data-state]': 'indeterminate() ? "indeterminate" : checked() ? "checked" : "unchecked"',
	},
	template: `
		<brn-checkbox
			hostStyles="display: inline-flex"
			[id]="id()"
			[name]="name()"
			[class]="_controlClass()"
			[checked]="checked()"
			[(indeterminate)]="indeterminate"
			[disabled]="_disabled()"
			[required]="required()"
			[forceInvalid]="_visualInvalid()"
			[aria-label]="ariaLabel()"
			[aria-labelledby]="ariaLabelledby()"
			[aria-describedby]="_describedBy()"
			(checkedChange)="_handleChange($event)"
			(touched)="_onTouched?.()"
		>
			@if (checked() || indeterminate()) {
				<span class="caps-checkbox-indicator" aria-hidden="true">
					<ng-icon [name]="indeterminate() ? 'lucideMinus' : 'lucideCheck'" />
				</span>
			}
		</brn-checkbox>
	`,
})
export class CapsCheckbox implements ControlValueAccessor {
	private static _nextId = 0;
	private readonly _fieldControl = inject(BrnFieldControl);
	private readonly _a11y = inject(BrnFieldA11yService, { optional: true });
	private readonly _renderer = inject(Renderer2);
	private readonly _brain = viewChild.required(BrnCheckbox);

	/** ID belongs to the native button. Field labels associate automatically. */
	public readonly id = input<string>(`caps-checkbox-${++CapsCheckbox._nextId}`);
	public readonly name = input<string | null>(null);
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly checkedInput = input<boolean, BooleanInput>(false, { alias: 'checked', transform: booleanAttribute });
	public readonly checked = linkedSignal(this.checkedInput);
	public readonly checkedChange = output<boolean>();
	public readonly indeterminate = model(false);
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly required = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	/** Forces visual feedback without changing the form's validity. */
	public readonly forceInvalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });

	protected readonly _disabled = linkedSignal(this.disabled);
	protected readonly _visualInvalid = computed(() => this.forceInvalid() || !!this._fieldControl.spartanInvalid());
	protected readonly _controlClass = computed(() => hlm('caps-checkbox', this.userClass()));
	protected readonly _describedBy = computed(() => {
		const ids = `${this.ariaDescribedby() ?? ''} ${this._a11y?.describedBy() ?? ''}`.split(/\s+/).filter(Boolean);
		return [...new Set(ids)].join(' ') || null;
	});
	protected _onChange?: ChangeFn<boolean>;
	protected _onTouched?: TouchFn;

	constructor() {
		// Brain owns the button; complete its native ARIA using its public element reference.
		afterRenderEffect(() => {
			const button = this._brain().checkbox().nativeElement;
			this._renderer.setAttribute(button, 'aria-required', String(this.required()));
			if (this._fieldControl.invalid()) this._renderer.setAttribute(button, 'aria-invalid', 'true');
			else this._renderer.removeAttribute(button, 'aria-invalid');
			for (const [attribute, active] of [
				['data-dirty', this._fieldControl.dirty()],
				['data-touched', this._fieldControl.touched()],
				['data-invalid', this._fieldControl.invalid()],
				['data-matches-spartan-invalid', this._visualInvalid()],
			] as const) {
				if (active) this._renderer.setAttribute(button, attribute, 'true');
				else this._renderer.removeAttribute(button, attribute);
			}
		});
	}

	protected _handleChange(value: boolean): void {
		if (this._disabled()) return;
		this.checked.set(value);
		this.checkedChange.emit(value);
		this._onChange?.(value);
	}

	public writeValue(value: boolean): void {
		this.checked.set(Boolean(value));
	}
	public registerOnChange(fn: ChangeFn<boolean>): void {
		this._onChange = fn;
	}
	public registerOnTouched(fn: TouchFn): void {
		this._onTouched = fn;
	}
	public setDisabledState(disabled: boolean): void {
		this._disabled.set(disabled);
	}
}
