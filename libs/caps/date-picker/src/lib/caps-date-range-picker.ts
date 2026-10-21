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
	untracked,
	viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CapsCalendarRange, type Weekday } from '@capsule-ng/caps/calendar';
import { CapsPopover, CapsPopoverImports } from '@capsule-ng/caps/popover';
import { type BrnDatePickerBase, BrnDatePickerTriggerToken, provideBrnDatePicker } from '@spartan-ng/brain/date-picker';
import { BrnFieldControl, provideBrnLabelable } from '@spartan-ng/brain/field';
import type { ChangeFn, TouchFn } from '@spartan-ng/brain/forms';
import type { BrnOverlayState } from '@spartan-ng/brain/overlay';
import { type BrnPopoverAlign } from '@spartan-ng/brain/popover';
import { injectCapsDateRangePickerConfig } from './caps-date-range-picker.token';

import { CapsDatePickerBoundary, CapsDatePickerContext } from './caps-date-picker-boundary';
import { CapsDateRangeInput } from './caps-date-range-input';

export const CAPS_DATE_RANGE_PICKER_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => CapsDateRangePicker),
	multi: true,
};

@Component({
	selector: 'caps-date-range-picker',
	imports: [CapsPopoverImports, CapsDateRangeInput, CapsDatePickerBoundary, CapsCalendarRange],
	providers: [
		CapsDatePickerContext,
		CAPS_DATE_RANGE_PICKER_VALUE_ACCESSOR,
		provideBrnDatePicker(CapsDateRangePicker),
		provideBrnLabelable(CapsDateRangePicker),
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
				<caps-date-range-input
					[inputId]="id()"
					[placeholder]="placeholder()"
					[aria-label]="ariaLabel()"
					[aria-labelledby]="ariaLabelledby()"
					[aria-describedby]="ariaDescribedby()"
				/>
			}

			<ng-template capsPopoverContent [class]="'w-fit p-4'">
				<ng-content select="[capsDatePickerHeader]" />
				<div capsDatePickerBoundary>
					<caps-calendar-range
						class="rounded-none border-0"
						[startDate]="_start()"
						[captionLayout]="captionLayout()"
						[endDate]="_end()"
						[min]="minDate()"
						[max]="maxDate()"
						[disabled]="_disabled()"
						[dateDisabled]="dateDisabled()"
						[weekStartsOn]="weekStartsOn()"
						[highlightDays]="highlightDays()"
						(startDateChange)="_handleStartDayChange($event)"
						(endDateChange)="_handleEndDateChange($event)"
					/>
				</div>
				<ng-content select="[capsDatePickerFooter]" />
			</ng-template>
		</caps-popover>
	`,
})
export class CapsDateRangePicker<T> implements BrnDatePickerBase<[T, T]>, ControlValueAccessor {
	protected readonly _context = inject(CapsDatePickerContext);
	private static _nextId = 0;
	public readonly id = input<string>(`caps-date-range-picker-${++CapsDateRangePicker._nextId}`);
	private readonly _config = injectCapsDateRangePickerConfig<T>();

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

	/** Show dropdowns to navigate between months or years. */
	public readonly captionLayout = input<'dropdown' | 'label' | 'dropdown-months' | 'dropdown-years'>('label');

	/** Calendar constraints, using the same generic adapter as the selected value. */
	public readonly dateDisabled = input<(date: T) => boolean>(() => false);
	public readonly weekStartsOn = input<Weekday>();
	public readonly highlightDays = input<T[]>([]);

	/** The minimum date that can be selected.*/
	public readonly minDate = input<T>();

	/** The maximum date that can be selected. */
	public readonly maxDate = input<T>();

	/** Determine if the date picker is disabled. */
	public readonly disabled = input<boolean, BooleanInput>(false, {
		transform: booleanAttribute,
	});

	/** The selected value. */
	public readonly date = input<[T, T]>();

	protected readonly _mutableDate = linkedSignal(this.date);

	protected readonly _start = linkedSignal(() => this._mutableDate()?.[0]);
	protected readonly _end = linkedSignal(() => this._mutableDate()?.[1]);

	/** If true, the date picker will close when the end date is selected */
	public readonly autoCloseOnEndSelection = input<boolean, BooleanInput>(this._config.autoCloseOnEndSelection, {
		transform: booleanAttribute,
	});

	/** Defines how the date should be displayed in the UI.  */
	public readonly formatDates = input<(dates: [T | null, T | null]) => string>(this._config.formatDates);

	/** Defines how the date should be transformed before saving to model/form. */
	public readonly transformDates = input<(date: [T, T]) => [T, T]>(this._config.transformDates);

	protected readonly _popoverState = signal<BrnOverlayState | null>(null);

	private readonly _formDisabled = signal(false);
	protected readonly _disabled = computed(() => this.disabled() || this._formDisabled());

	/** @internal The disabled state as a readonly signal */
	public readonly disabledState = this._disabled;

	public readonly formattedDate = computed(() => {
		const start = this._start();
		const end = this._end();
		return start || end ? this.formatDates()([start ?? null, end ?? null]) : undefined;
	});

	public readonly dateChange = output<[T, T] | null>();

	public readonly labelableId = computed(() => (this._trigger() ?? this._defaultTrigger())?.triggerId());

	public readonly hasDate = computed(() => !!this._start() || !!this._end());

	/** @internal The current raw value, used by inputs to reformat on focus. */
	public readonly value = computed(() => this._mutableDate() ?? null);

	protected _onChange?: ChangeFn<[T, T] | null>;
	protected _onTouched?: TouchFn;

	protected _onStateChange(state: BrnOverlayState) {
		this._popoverState.set(state);
		if (state === 'closed') {
			this._onClose();
			this._onTouched?.();
		}
	}

	protected _handleStartDayChange(value: T | undefined) {
		if (this._disabled()) return;
		this._start.set(value);
	}

	protected _handleEndDateChange(value: T | undefined): void {
		if (this._disabled()) return;
		this._end.set(value);

		const start = this._start();
		if (start && value) {
			const transformedDates = this.transformDates()([start, value]);
			this._mutableDate.set(transformedDates);
			this.dateChange.emit(transformedDates);
			this._onChange?.(transformedDates);

			if (this.autoCloseOnEndSelection()) {
				this.close();
			}
		}
	}

	/**
	 * Commit a range to the picker. Updates the internal model, notifies form
	 * controls, and emits `dateChange`. Intended to be called from a text input
	 * that parses user-entered values. Pass `null` to clear the range.
	 */
	public updateDate(value: [T, T] | null) {
		if (this._disabled()) return;

		if (!value) {
			this._mutableDate.set(undefined);
			this._start.set(undefined);
			this._end.set(undefined);
			this._onChange?.(null);
			this.dateChange.emit(null);
			return;
		}

		const transformedDates = this.transformDates()(value);
		this._mutableDate.set(transformedDates);
		this._start.set(transformedDates[0]);
		this._end.set(transformedDates[1]);
		this._onChange?.(transformedDates);
		this.dateChange.emit(transformedDates);
	}

	public touched(): void {
		this._onTouched?.();
	}

	/** CONTROL VALUE ACCESSOR */
	public writeValue(value: [T, T] | null): void {
		untracked(() => {
			if (!value) {
				this._mutableDate.set(undefined);
			} else {
				this._mutableDate.set(this.transformDates()(value));
			}
		});
	}

	public registerOnChange(fn: ChangeFn<[T, T] | null>): void {
		this._onChange = fn;
	}

	public registerOnTouched(fn: TouchFn): void {
		this._onTouched = fn;
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
		this._start.set(undefined);
		this._end.set(undefined);
		this._onChange?.(null);
		this.dateChange.emit(null);
	}

	protected _onClose(): void {
		const dates = this._mutableDate();
		if (this._start() && !this._end() && dates) {
			this._start.set(dates[0]);
			this._end.set(dates[1]);
		}
	}
	constructor() {
		effect(() => {
			if (this._disabled()) this.close();
		});
	}
}
