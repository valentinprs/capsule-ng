import type { BooleanInput, NumberInput } from '@angular/cdk/coercion';
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
	numberAttribute,
	output,
	signal,
	viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CapsCalendarMulti, type Weekday } from '@capsule-ng/caps/calendar';
import { CapsPopover, CapsPopoverImports } from '@capsule-ng/caps/popover';
import { type BrnDatePickerBase, BrnDatePickerTriggerToken, provideBrnDatePicker } from '@spartan-ng/brain/date-picker';
import { BrnFieldControl, provideBrnLabelable } from '@spartan-ng/brain/field';
import type { ChangeFn, TouchFn } from '@spartan-ng/brain/forms';
import type { BrnOverlayState } from '@spartan-ng/brain/overlay';
import { type BrnPopoverAlign } from '@spartan-ng/brain/popover';
import { injectCapsDatePickerMultiConfig } from './caps-date-picker-multi.token';

import { CapsDateMultiInput } from './caps-date-multi-input';
import { CapsDatePickerBoundary, CapsDatePickerContext } from './caps-date-picker-boundary';

export const CAPS_DATE_PICKER_MULTI_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => CapsDatePickerMulti),
	multi: true,
};

@Component({
	selector: 'caps-date-picker-multi',
	imports: [CapsPopoverImports, CapsDateMultiInput, CapsDatePickerBoundary, CapsCalendarMulti],
	providers: [
		CapsDatePickerContext,
		CAPS_DATE_PICKER_MULTI_VALUE_ACCESSOR,
		provideBrnDatePicker(CapsDatePickerMulti),
		provideBrnLabelable(CapsDatePickerMulti),
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
				<caps-date-multi-input
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
					<caps-calendar-multi
						class="rounded-none border-0"
						[date]="_mutableDate()"
						[captionLayout]="captionLayout()"
						[min]="minDate()"
						[max]="maxDate()"
						[minSelection]="minSelection()"
						[maxSelection]="maxSelection()"
						[disabled]="_disabled()"
						[dateDisabled]="dateDisabled()"
						[weekStartsOn]="weekStartsOn()"
						[highlightDays]="highlightDays()"
						(dateChange)="_handleChange($event)"
					/>
				</div>
				<ng-content select="[capsDatePickerFooter]" />
			</ng-template>
		</caps-popover>
	`,
})
export class CapsDatePickerMulti<T> implements BrnDatePickerBase<T[]>, ControlValueAccessor {
	protected readonly _context = inject(CapsDatePickerContext);
	private static _nextId = 0;
	public readonly id = input<string>(`caps-date-picker-multi-${++CapsDatePickerMulti._nextId}`);
	private readonly _config = injectCapsDatePickerMultiConfig<T>();

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

	/** The minimum selectable dates.  */
	public readonly minSelection = input<number, NumberInput>(undefined, {
		transform: numberAttribute,
	});

	/** The maximum selectable dates.  */
	public readonly maxSelection = input<number, NumberInput>(undefined, {
		transform: numberAttribute,
	});

	/** Determine if the date picker is disabled. */
	public readonly disabled = input<boolean, BooleanInput>(false, {
		transform: booleanAttribute,
	});

	/** The selected value. */
	public readonly date = input<T[]>();

	protected readonly _mutableDate = linkedSignal(this.date);

	/** If true, the date picker will close when the max selection of dates is reached. */
	public readonly autoCloseOnMaxSelection = input<boolean, BooleanInput>(this._config.autoCloseOnMaxSelection, {
		transform: booleanAttribute,
	});

	/** Defines how the date should be displayed in the UI.  */
	public readonly formatDates = input<(date: T[]) => string>(this._config.formatDates);

	/** Defines how the date should be transformed before saving to model/form. */
	public readonly transformDates = input<(date: T[]) => T[]>(this._config.transformDates);

	protected readonly _popoverState = signal<BrnOverlayState | null>(null);

	private readonly _formDisabled = signal(false);
	protected readonly _disabled = computed(() => this.disabled() || this._formDisabled());

	/** @internal The disabled state as a readonly signal */
	public readonly disabledState = this._disabled;

	public readonly formattedDate = computed(() => {
		const dates = this._mutableDate();
		return dates ? this.formatDates()(dates) : undefined;
	});

	public readonly dateChange = output<T[]>();

	public readonly labelableId = computed(() => (this._trigger() ?? this._defaultTrigger())?.triggerId());

	public readonly hasDate = computed(() => !!this._mutableDate()?.length);

	/** @internal The current raw value, used by inputs to reformat on focus. */
	public readonly value = computed(() => this._mutableDate() ?? null);

	protected _onChange?: ChangeFn<T[]>;
	protected _onTouched?: TouchFn;

	protected _onStateChange(state: BrnOverlayState) {
		this._popoverState.set(state);
		if (state === 'closed') this._onTouched?.();
	}

	protected _handleChange(value: T[] | undefined) {
		if (value === undefined) return;

		if (this._disabled()) return;
		const transformedDate = value !== undefined ? this.transformDates()(value) : value;

		this._mutableDate.set(transformedDate);
		this._onChange?.(transformedDate);
		this.dateChange.emit(transformedDate);

		if (this.autoCloseOnMaxSelection() && this._mutableDate()?.length === this.maxSelection()) {
			this.close();
		}
	}

	/**
	 * Commit dates to the picker. Updates the internal model, notifies form
	 * controls, and emits `dateChange`. Intended to be called from a text input
	 * that parses user-entered values. Pass `null` to clear the selection.
	 */
	public updateDate(value: T[] | null) {
		if (this._disabled()) return;
		const transformedDate = value ? this.transformDates()(value) : undefined;

		this._mutableDate.set(transformedDate);
		this._onChange?.(transformedDate ?? []);
		this.dateChange.emit(transformedDate ?? []);
	}

	public touched(): void {
		this._onTouched?.();
	}

	/** CONTROL VALUE ACCESSOR */
	public writeValue(value: T[] | null): void {
		this._mutableDate.set(value ? this.transformDates()(value) : undefined);
	}

	public registerOnChange(fn: ChangeFn<T[]>): void {
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
		this._onChange?.([]);
		this.dateChange.emit([]);
	}
	constructor() {
		effect(() => {
			if (this._disabled()) this.close();
		});
	}
}
