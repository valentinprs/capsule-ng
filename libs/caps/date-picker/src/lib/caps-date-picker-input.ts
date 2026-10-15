import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, viewChild } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideX } from '@ng-icons/lucide';
import {
	BrnDateInput,
	type BrnDatePickerTriggerBase,
	provideBrnDatePickerTrigger,
} from '@spartan-ng/brain/date-picker';
import { BrnFieldControl } from '@spartan-ng/brain/field';
import { CapsDatePickerBoundary } from './caps-date-picker-boundary';
import { injectCapsDatePickerConfig } from './caps-date-picker.token';

@Component({
	selector: 'caps-date-picker-input',
	imports: [CapsInputGroupImports, CapsInput, CapsButton, CapsDatePickerBoundary, NgIcon],
	providers: [provideIcons({ lucideCalendar, lucideX }), provideBrnDatePickerTrigger(CapsDatePickerInput)],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'block',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
	},
	template: `
		<caps-input-group>
			<input
				#input
				capsInput
				capsDatePickerBoundary
				data-slot="date-picker-input"
				[value]="_inputValue()"
				[id]="inputId()"
				[placeholder]="placeholder()"
				[attr.aria-label]="ariaLabel()"
				[attr.aria-labelledby]="ariaLabelledby()"
				[aria-describedby]="ariaDescribedby()"
				[disabled]="_disabled()"
				[forceInvalid]="forceInvalid()"
				[attr.aria-invalid]="_ariaInvalid()"
				[attr.data-invalid]="_ariaInvalid()"
				[attr.data-touched]="_touched?.() ? 'true' : null"
				[attr.data-dirty]="_dirty?.() ? 'true' : null"
				[attr.data-matches-spartan-invalid]="_spartanInvalid() ? 'true' : null"
				(click)="_handleClick()"
				(keydown.arrowDown)="_open()"
				(keydown.enter)="_handleEnter($event)"
				(input)="_handleInputChange($event)"
				(focus)="_handleFocus()"
				(blur)="_handleBlur()"
			/>
			<caps-input-group-addon align="inline-end">
				@if (_showClearButton()) {
					<button
						capsButton
						type="button"
						size="icon"
						variant="ghost"
						[attr.aria-label]="clearAriaLabel()"
						(click)="_clear()"
						[disabled]="_disabled()"
					>
						<ng-icon name="lucideX" aria-hidden="true" />
					</button>
				}
				<button
					capsButton
					type="button"
					size="icon"
					[attr.aria-label]="calendarAriaLabel()"
					(click)="_openFromButton()"
					aria-haspopup="dialog"
					[attr.aria-expanded]="_popover().stateComputed() === 'open'"
					[attr.aria-controls]="_popover().id()"
					[disabled]="_disabled()"
				>
					<ng-icon name="lucideCalendar" aria-hidden="true" />
				</button>
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class CapsDatePickerInput<T> extends BrnDateInput<T> implements BrnDatePickerTriggerBase {
	private readonly _nativeInput = viewChild.required<ElementRef<HTMLInputElement>>('input');
	protected override _open() {
		if (!this._disabled()) super._open();
	}
	protected override _handleInputChange(event: Event) {
		if (!this._disabled()) super._handleInputChange(event);
	}
	protected _openFromButton() {
		if (this._disabled()) return;
		this._nativeInput().nativeElement.focus();
		this._open();
	}
	protected override _clear() {
		if (this._disabled()) return;
		super._clear();
		this._nativeInput().nativeElement.focus();
	}
	protected override _commitDate() {
		if (!this._disabled()) super._commitDate();
	}

	private readonly _config = injectCapsDatePickerConfig<T>();
	private readonly _fieldControl = inject(BrnFieldControl, { optional: true });

	private readonly _invalid = this._fieldControl?.spartanInvalid;
	protected readonly _spartanInvalid = computed(() => this.forceInvalid() || this._fieldControl?.spartanInvalid());
	protected readonly _dirty = this._fieldControl?.dirty;
	protected readonly _touched = this._fieldControl?.touched;

	protected readonly _ariaInvalid = computed(() => (this._invalid?.() ? 'true' : null));

	/**
	 * Parses input text into a date value. Return `null` for invalid
	 * input - the picker's date is cleared while the text is preserved so
	 * the user can fix it.
	 *
	 * Defaults to `parseDate` from `CapsDatePickerConfig`.
	 */
	public readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });

	public readonly parseDate = input<(value: string) => T | null>(this._config.parseDate);

	/**
	 * Formats the current date into the input/edit format shown while the
	 * input is focused. On blur the picker's display format is restored.
	 *
	 * Defaults to `formatInputDate` from `CapsDatePickerConfig`.
	 */
	public readonly formatInputDate = input<(date: T) => string>(this._config.formatInputDate);

	protected parseValue(value: string): T | null {
		return this.parseDate()(value);
	}

	protected formatInputValue(value: T): string {
		return this.formatInputDate()(value);
	}
}
