import type { BooleanInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChild,
	effect,
	forwardRef,
	inject,
	input,
	linkedSignal,
	output,
	signal,
	viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CapsCalendarImports } from '@capsule-ng/caps/calendar';
import { CapsPopover, CapsPopoverImports } from '@capsule-ng/caps/popover';
import { type BrnDatePickerBase, BrnDatePickerTriggerToken, provideBrnDatePicker } from '@spartan-ng/brain/date-picker';
import { BrnFieldControl, provideBrnLabelable } from '@spartan-ng/brain/field';
import type { ChangeFn, TouchFn } from '@spartan-ng/brain/forms';
import type { BrnOverlayState } from '@spartan-ng/brain/overlay';
import { type BrnPopoverAlign } from '@spartan-ng/brain/popover';
import { injectCapsMonthYearPickerConfig } from './caps-month-year-picker.token';

import { CapsDatePickerBoundary, CapsDatePickerContext } from './caps-date-picker-boundary';
import { CapsMonthYearInput } from './caps-month-year-input';

export const CAPS_MONTH_YEAR_PICKER_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => CapsMonthYearPicker),
	multi: true,
};
@Component({
	selector: 'caps-month-year-picker',
	imports: [CapsPopoverImports, CapsMonthYearInput, CapsDatePickerBoundary, CapsCalendarImports],
	providers: [
		CapsDatePickerContext,
		CAPS_MONTH_YEAR_PICKER_VALUE_ACCESSOR,
		provideBrnDatePicker(CapsMonthYearPicker),
		provideBrnLabelable(CapsMonthYearPicker),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [BrnFieldControl],
	host: {
		class: 'block',
		'data-slot': 'date-picker',
		'[attr.id]': 'null',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
	},
	template: `
		<caps-popover
			[dir]="_context.direction()"
			[aria-label]="ariaLabel() ?? _context.dialogLabel()"
			[aria-labelledby]="ariaLabelledby() ?? undefined"
			[placement]="_placement()"
			[caret]="false"
			[open]="_popoverState() === 'open'"
			(openChange)="_onStateChange($event ? 'open' : 'closed')"
		>
			<ng-content />
			@if (!_trigger()) {
				<caps-month-year-input
					[inputId]="id()"
					[placeholder]="placeholder()"
					[aria-label]="ariaLabel()"
					[aria-labelledby]="ariaLabelledby()"
					[aria-describedby]="ariaDescribedby()"
				/>
			}

			<ng-template capsPopoverContent [class]="'w-fit p-0'">
				<ng-content select="[capsDatePickerHeader]" />
				<div capsDatePickerBoundary>
					<caps-month-year-calendar
						class="rounded-none border-0"
						[date]="_mutableDate()"
						[defaultFocusedDate]="_mutableDate() ?? defaultFocusedDate()"
						[min]="minDate()"
						[max]="maxDate()"
						[disabled]="_disabled()"
						(dateChange)="_handleChange($event)"
					/>
				</div>
				<ng-content select="[capsDatePickerFooter]" />
			</ng-template>
		</caps-popover>
	`,
})
export class CapsMonthYearPicker<T> implements BrnDatePickerBase<T>, ControlValueAccessor {
	protected readonly _context = inject(CapsDatePickerContext);
	private static _nextId = 0;
	public readonly id = input<string>(`caps-month-year-picker-${++CapsMonthYearPicker._nextId}`);
	private readonly _config = injectCapsMonthYearPickerConfig<T>();

	private readonly _popover = viewChild.required(CapsPopover);
	public readonly popover = computed(() => this._popover().layer);
	private readonly _defaultTrigger = viewChild(BrnDatePickerTriggerToken);
	public readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });
	public readonly placeholder = input<string>('');

	protected readonly _trigger = contentChild(BrnDatePickerTriggerToken);

	public readonly align = input<BrnPopoverAlign>('center');
	protected readonly _placement = computed(() =>
		this.align() === 'center' ? 'bottom' : this.align() === 'start' ? 'bottom-start' : 'bottom-end',
	);

	/** The minimum date that can be selected.*/
	public readonly minDate = input<T>();

	/** The maximum date that can be selected. */
	public readonly maxDate = input<T>();

	/** Determine if the date picker is disabled. */
	public readonly disabled = input<boolean, BooleanInput>(false, {
		transform: booleanAttribute,
	});

	/** The selected value. */
	public readonly date = input<T>();

	/** The date the calendar focuses on first open when no date is selected. */
	public readonly defaultFocusedDate = input<T>();

	protected readonly _mutableDate = linkedSignal(this.date);

	/** If true, the date picker will close when a date is selected. */
	public readonly autoCloseOnSelect = input<boolean, BooleanInput>(this._config.autoCloseOnSelect, {
		transform: booleanAttribute,
	});

	/** Defines how the date should be displayed in the UI.  */
	public readonly formatDate = input<(date: T) => string>(this._config.formatDate);

	/** Defines how the date should be transformed before saving to model/form. */
	public readonly transformDate = input<(date: T) => T>(this._config.transformDate);

	protected readonly _popoverState = signal<BrnOverlayState | null>(null);

	private readonly _formDisabled = signal(false);
	protected readonly _disabled = computed(() => this.disabled() || this._formDisabled());

	/** @internal The disabled state as a readonly signal */
	public readonly disabledState = this._disabled;

	public readonly formattedDate = computed(() => {
		const date = this._mutableDate();
		return date ? this.formatDate()(date) : undefined;
	});

	public readonly dateChange = output<T | null>();

	public readonly labelableId = computed(() => (this._trigger() ?? this._defaultTrigger())?.triggerId());

	public readonly hasDate = computed(() => !!this._mutableDate());

	/** @internal The current raw value, used by inputs to reformat on focus. */
	public readonly value = computed(() => this._mutableDate() ?? null);

	protected _onChange?: ChangeFn<T | null>;
	protected _onTouched?: TouchFn;

	protected _onStateChange(state: BrnOverlayState) {
		this._popoverState.set(state);
		if (state === 'closed') this._onTouched?.();
	}

	protected _handleChange(value: T | undefined) {
		if (this._disabled()) return;
		this.updateDate(value ?? null);

		if (this.autoCloseOnSelect()) {
			this.close();
		}
	}

	/**
	 * Commit a date to the picker. Updates the internal model, notifies form
	 * controls, and emits `dateChange`. Unlike `_handleChange`, this does not
	 * close the popover - it's intended to be called from a text input that
	 * is parsing user-entered values while typing.
	 */
	public updateDate(value: T | null) {
		if (this._disabled()) return;
		const transformedDate = value != null ? this.transformDate()(value) : undefined;

		this._mutableDate.set(transformedDate);
		this._onChange?.(transformedDate ?? null);
		this.dateChange.emit(transformedDate ?? null);
	}

	/** CONTROL VALUE ACCESSOR */
	public writeValue(value: T | null): void {
		this._mutableDate.set(value ? this.transformDate()(value) : undefined);
	}

	public registerOnChange(fn: ChangeFn<T | null>): void {
		this._onChange = fn;
	}

	public registerOnTouched(fn: TouchFn): void {
		this._onTouched = fn;
	}

	public touched(): void {
		this._onTouched?.();
	}

	public setDisabledState(isDisabled: boolean): void {
		this._formDisabled.set(isDisabled);
		if (isDisabled) this.close();
	}

	public open() {
		if (this._disabled()) return;
		this._popoverState.set('open');
	}

	public close() {
		if (this._popoverState() === 'open') this._onStateChange('closed');
		else this._popoverState.set('closed');
	}

	public reset() {
		if (this._disabled()) return;
		this._mutableDate.set(undefined);
		this._onChange?.(null);
		this.dateChange.emit(null);
	}
	constructor() {
		effect(() => {
			if (this._disabled()) this.close();
		});
	}
}
