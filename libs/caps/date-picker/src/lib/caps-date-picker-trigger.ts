import { BooleanInput } from '@angular/cdk/coercion';
import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	type Signal,
} from '@angular/core';
import { CapsButtonImports, type CapsButtonVariant } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar } from '@ng-icons/lucide';
import {
	type BrnDatePickerTriggerBase,
	injectBrnDatePicker,
	provideBrnDatePickerTrigger,
} from '@spartan-ng/brain/date-picker';
import { BrnFieldControl, BrnFieldControlDescribedBy } from '@spartan-ng/brain/field';
import { type BrnPopover } from '@spartan-ng/brain/popover';
import { hlm } from '@spartan-ng/helm/utils';
import { ClassValue } from 'clsx';
import { CapsDatePickerAnchor } from './caps-date-picker-anchor';

@Component({
	selector: 'caps-date-picker-trigger',
	imports: [CapsButtonImports, NgIcon, BrnFieldControlDescribedBy, CapsDatePickerAnchor],
	providers: [provideIcons({ lucideCalendar }), provideBrnDatePickerTrigger(CapsDatePickerTrigger)],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'data-slot': 'date-picker-trigger',
		'[attr.aria-label]': 'null',
		'[attr.aria-labelledby]': 'null',
		'[attr.aria-describedby]': 'null',
	},
	template: `
		<button
			[id]="buttonId()"
			type="button"
			[class]="_computedClass()"
			[disabled]="_disabled()"
			[attr.aria-invalid]="_ariaInvalid()"
			[attr.data-invalid]="_ariaInvalid()"
			[attr.data-touched]="_touched?.() ? 'true' : null"
			[attr.data-dirty]="_dirty?.() ? 'true' : null"
			[attr.data-matches-spartan-invalid]="_spartanInvalid() ? 'true' : null"
			capsButton
			[variant]="variant()"
			capsDatePickerAnchor
			[capsDatePickerAnchorFor]="_popover()"
			(click)="_open()"
			aria-haspopup="dialog"
			[attr.aria-expanded]="_popover().stateComputed() === 'open'"
			[attr.aria-controls]="_popover().id()"
			brnFieldControlDescribedBy
			[attr.aria-label]="ariaLabel()"
			[attr.aria-labelledby]="ariaLabelledby()"
			[aria-describedby]="ariaDescribedby()"
			[attr.data-placeholder]="_isPlaceholder() ? '' : null"
		>
			@if (showTrigger()) {
				<ng-icon name="lucideCalendar" aria-hidden="true" />
			}
			<span class="truncate">
				@if (_formattedDate(); as formattedDate) {
					{{ formattedDate }}
				} @else {
					<ng-content />
				}
			</span>
		</button>
	`,
})
export class CapsDatePickerTrigger implements BrnDatePickerTriggerBase {
	private static _nextId = 0;

	private readonly _fieldControl = inject(BrnFieldControl, { optional: true });
	private readonly _datePicker = injectBrnDatePicker();

	private readonly _invalid = this._fieldControl?.spartanInvalid;
	protected readonly _spartanInvalid = computed(() => this.forceInvalid() || this._fieldControl?.spartanInvalid());
	protected readonly _dirty = this._fieldControl?.dirty;
	protected readonly _touched = this._fieldControl?.touched;

	protected readonly _ariaInvalid = computed(() => (this._invalid?.() ? 'true' : null));

	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() => hlm('caps-date-picker-trigger justify-start', this.userClass()));

	protected readonly _isPlaceholder = computed(() => !this._datePicker.hasDate());

	/** The id of the button that opens the date picker. */
	public readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
	public readonly ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });
	public readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });
	public readonly buttonId = input<string>(`caps-date-picker-trigger-${++CapsDatePickerTrigger._nextId}`);

	/** @internal The id of the button that opens the date picker, used for labeling. */
	public readonly triggerId = this.buttonId;

	/** Forces the invalid state visually, regardless of form control state. */
	public readonly forceInvalid = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

	public readonly variant = input<CapsButtonVariant>('outline');

	/** Shows the calendar icon at the start of the field, as in the Figma Date Picker. */
	public readonly showTrigger = input<boolean, BooleanInput>(true, { transform: booleanAttribute });

	protected _open() {
		if (!this._disabled()) this._popover().open();
	}

	protected readonly _popover: Signal<BrnPopover> = this._datePicker.popover;
	protected readonly _disabled = this._datePicker.disabledState;
	protected readonly _formattedDate = this._datePicker.formattedDate;
}
