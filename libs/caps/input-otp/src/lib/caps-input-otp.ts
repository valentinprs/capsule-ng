import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
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
	numberAttribute,
	output,
	signal,
	untracked,
	viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrnFieldA11yService, BrnFieldControl, provideBrnLabelable } from '@spartan-ng/brain/field';
import type { ChangeFn, TouchFn } from '@spartan-ng/brain/forms';
import type { InputMode } from '@spartan-ng/brain/input-otp';
import { classes } from '@spartan-ng/helm/utils';
import { CapsInputOtpBrain } from './caps-input-otp-brain';

/** One native input, projected visual slots, and Brain's Angular forms behavior. */
@Component({
	selector: 'caps-input-otp',
	imports: [CapsInputOtpBrain],
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CapsInputOtp), multi: true },
		provideBrnLabelable(CapsInputOtp),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnFieldControl],
	host: {
		'data-slot': 'input-otp',
		'[attr.id]': 'null',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
		'[attr.data-disabled]': '_disabled() ? "true" : null',
	},
	template: `
		<ng-content />
		<caps-input-otp-brain
			hostStyles="position: absolute; inset: 0; pointer-events: none;"
			[length]="length()"
			[inputId]="id()"
			[inputMode]="inputMode()"
			[inputAutocomplete]="autocomplete()"
			[autofocus]="autofocus()"
			[disabled]="_disabled()"
			[value]="value()"
			[transformPaste]="transformPaste()"
			[label]="ariaLabel()"
			[labelledBy]="ariaLabelledby()"
			[describedBy]="_describedBy()"
			[controlInvalid]="fieldControl.invalid() ?? false"
			(valueChange)="_change($event)"
			(completed)="completed.emit($event)"
			(blurred)="_onTouched?.()"
		/>
	`,
})
export class CapsInputOtp implements ControlValueAccessor {
	private static _nextId = 0;
	public readonly fieldControl = inject(BrnFieldControl);
	private readonly _a11y = inject(BrnFieldA11yService, { optional: true });
	private readonly _brain = viewChild(CapsInputOtpBrain);
	private readonly _ready = signal(false);
	private readonly _pendingWrite = signal<{ value: string | null } | null>(null);

	public readonly id = input(`caps-input-otp-${++CapsInputOtp._nextId}`);
	public readonly labelableId = this.id;
	public readonly length = input.required<number, NumberInput>({ transform: numberAttribute });
	public readonly inputMode = input<InputMode>('numeric');
	public readonly autocomplete = input<'one-time-code' | 'off'>('one-time-code');
	public readonly autofocus = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly disabled = input<boolean, BooleanInput>(false, { transform: booleanAttribute });
	public readonly valueInput = input<string | null>(null, { alias: 'value' });
	public readonly value = linkedSignal(this.valueInput);
	public readonly transformPaste = input<(text: string, length: number) => string>((text) => text);
	public readonly valueChange = output<string>();
	public readonly completed = output<string>();
	public readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });

	/** Internal slot context; the native input remains the sole focus target. */
	public readonly context = computed(() =>
		this._ready()
			? (this._brain()?.context() ?? [])
			: Array.from(this.value() ?? '', (char) => ({ char, isActive: false, hasFakeCaret: false })),
	);
	private readonly _formDisabled = signal(false);
	protected readonly _disabled = computed(() => this.disabled() || this._formDisabled());
	protected readonly _describedBy = computed(() => {
		const ids = `${this.ariaDescribedby() ?? ''} ${this._a11y?.describedBy() ?? ''}`.split(/\s+/).filter(Boolean);
		return [...new Set(ids)].join(' ') || null;
	});
	protected _onChange?: ChangeFn<string>;
	protected _onTouched?: TouchFn;

	constructor() {
		classes(() => 'caps-input-otp relative inline-flex items-center');
		afterRenderEffect(() => {
			const brain = this._brain();
			const pending = this._pendingWrite();
			if (!brain) return;
			this._ready.set(true);
			if (!pending) return;
			untracked(() => {
				brain.writeValue(pending.value);
				this._pendingWrite.set(null);
			});
		});
	}
	protected _change(value: string): void {
		if (this._disabled()) return;
		this.value.set(value);
		this.valueChange.emit(value);
		this._onChange?.(value);
	}
	public writeValue(value: string | null): void {
		this.value.set(value);
		const brain = this._brain();
		if (brain && this._ready()) brain.writeValue(value);
		else this._pendingWrite.set({ value });
	}
	public registerOnChange(fn: ChangeFn<string>): void {
		this._onChange = fn;
	}
	public registerOnTouched(fn: TouchFn): void {
		this._onTouched = fn;
	}
	public setDisabledState(disabled: boolean): void {
		this._formDisabled.set(disabled);
	}
}
