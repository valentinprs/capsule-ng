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
	output,
	Renderer2,
	viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrnFieldA11yService, BrnFieldControl } from '@spartan-ng/brain/field';
import { type ChangeFn, type TouchFn } from '@spartan-ng/brain/forms';
import { BrnSwitch } from '@spartan-ng/brain/switch';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';

/** A styled Brain switch with a native interactive button and Angular forms support. */
@Component({
	selector: 'caps-switch',
	imports: [BrnSwitch],
	providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CapsSwitch), multi: true }],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnFieldControl],
	host: {
		class: 'inline-flex shrink-0 peer',
		'data-slot': 'switch',
		'[attr.id]': 'null',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
		'[attr.data-disabled]': '_disabled() ? "true" : null',
		'[attr.data-state]': 'checked() ? "checked" : "unchecked"',
	},
	template: `
		<brn-switch
			hostStyles="display: inline-flex"
			[id]="id()"
			[name]="name()"
			[class]="_controlClass()"
			[checked]="checked()"
			[size]="size()"
			[disabled]="_disabled()"
			[required]="required()"
			[forceInvalid]="_visualInvalid()"
			[aria-label]="ariaLabel()"
			[aria-labelledby]="ariaLabelledby()"
			[aria-describedby]="_describedBy()"
			(checkedChange)="_handleChange($event)"
			(touched)="_onTouched?.()"
		>
			<span class="caps-switch-thumb" aria-hidden="true"></span>
		</brn-switch>
	`,
})
export class CapsSwitch implements ControlValueAccessor {
	private static _nextId = 0;
	private readonly _fieldControl = inject(BrnFieldControl);
	private readonly _a11y = inject(BrnFieldA11yService, { optional: true });
	private readonly _renderer = inject(Renderer2);
	private readonly _brain = viewChild.required(BrnSwitch);

	/** ID belongs to the native button. Field labels associate automatically. */
	public readonly id = input<string>(`caps-switch-${++CapsSwitch._nextId}`);
	public readonly name = input<string | null>(null);
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	public readonly checkedInput = input<boolean, BooleanInput>(false, { alias: 'checked', transform: booleanAttribute });
	public readonly checked = linkedSignal(this.checkedInput);
	public readonly checkedChange = output<boolean>();
	public readonly size = input<'default' | 'sm'>('default');
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly required = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	/** Forces visual feedback without changing the form's validity. */
	public readonly forceInvalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });

	protected readonly _disabled = linkedSignal(this.disabled);
	protected readonly _visualInvalid = computed(() => this.forceInvalid() || !!this._fieldControl.spartanInvalid());
	protected readonly _controlClass = computed(() => hlm('caps-switch', this.userClass()));
	protected readonly _describedBy = computed(() => {
		const ids = `${this.ariaDescribedby() ?? ''} ${this._a11y?.describedBy() ?? ''}`.split(/\s+/).filter(Boolean);
		return [...new Set(ids)].join(' ') || null;
	});
	protected _onChange?: ChangeFn<boolean>;
	protected _onTouched?: TouchFn;

	constructor() {
		// Brain owns the button; complete its native ARIA using its public element reference.
		afterRenderEffect(() => {
			const button = this._brain().switch().nativeElement;
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
