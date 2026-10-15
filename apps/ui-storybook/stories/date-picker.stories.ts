import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { provideCapsCalendarI18n } from '@capsule-ng/caps/calendar';
import { CapsDatePicker, CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsDatePicker<Date>> = {
	title: 'Date Picker',
	component: CapsDatePicker,
	tags: ['autodocs'],
	args: {
		captionLayout: 'label',
		minDate: new Date(2020, 4, 1),
		maxDate: new Date(2030, 6, 1),
	},
	argTypes: {
		captionLayout: {
			options: ['dropdown', 'label', 'dropdown-months', 'dropdown-years'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			providers: [
				provideCapsCalendarI18n({
					months: () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					formatHeader: (m, y) => new Date(y, m).toLocaleDateString('en', { month: 'long', year: 'numeric' }),
				}),
			],
			imports: [CapsDatePickerImports, ReactiveFormsModule, CapsFieldImports, CapsButton],
		}),
	],
	render: ({ ...args }) => ({
		props: args,
		template: `
		<h1 class="sr-only">Date Picker demonstration</h1><div class="preview flex min-h-[350px] w-full justify-center p-10 items-center">
			<caps-date-picker [minDate]="minDate" [maxDate]="maxDate" [captionLayout]="captionLayout">
                <caps-date-picker-trigger buttonId="date">Pick a date</caps-date-picker-trigger>
            </caps-date-picker>
		</div>
		`,
	}),
};

export default meta;

type Story = StoryObj<CapsDatePicker<Date>>;

const pad = (value: number): string => String(value).padStart(2, '0');

/** Display format (shown on blur / in the trigger) - intentionally distinct from the edit format. */
const formatDate = (date: Date): string => date.toDateString();

/** Edit format (shown while focused) - `dd/MM/yyyy`. */
const formatInputDate = (date: Date): string =>
	`${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;

/** Parses `dd/MM/yyyy` back into a `Date`. Does not understand the display format on purpose. */
const parseDate = (value: string): Date | null => {
	const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
	if (!match) return null;
	const date = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
	return isNaN(date.getTime()) ? null : date;
};

export const Default: Story = {
	args: { minDate: new Date(2020, 4, 1), maxDate: new Date(2030, 6, 1), captionLayout: 'label' },
};

export const Input: Story = {
	render: () => ({
		props: { formatDate, formatInputDate, parseDate },
		template: `
		<h1 class="sr-only">Date Picker demonstration</h1><div class="preview flex min-h-[350px] w-full justify-center p-10 items-center">
			<caps-date-picker #picker [formatDate]="formatDate">
				<caps-date-picker-input
					inputId="date-input" aria-label="Date"
					placeholder="dd/MM/yyyy"
					[parseDate]="parseDate"
					[formatInputDate]="formatInputDate"
				/>
				</caps-date-picker>
			<output id="date-trigger" [attr.data-placeholder]="picker.hasDate() ? null : ''">{{ picker.formattedDate() ?? 'unset' }}</output>
		</div>
		`,
	}),
};

/**
 * Preseeds the picker with a month-end date (the 31st of August) and dropdown captions.
 * Navigating to a shorter month (e.g. November) from this date used to roll the focused
 * month forward to December because the 31st does not exist in the target month.
 * See https://github.com/spartan-ng/spartan/issues/1720
 */
export const PreselectedEndOfMonth: Story = {
	args: { captionLayout: 'dropdown' },
	render: (args) => ({
		props: { ...args, date: new Date(2024, 7, 31) },
		template: `
		<h1 class="sr-only">Date Picker demonstration</h1><div class="preview flex min-h-[350px] w-full justify-center p-10 items-center">
			<caps-date-picker [minDate]="minDate" [maxDate]="maxDate" [captionLayout]="captionLayout" [date]="date">
                <caps-date-picker-trigger buttonId="date">Pick a date</caps-date-picker-trigger>
            </caps-date-picker>
		</div>
		`,
	}),
};

export const WithHintAndError: Story = {
	render: (args) => ({
		props: {
			...args,
			form: new FormGroup({
				date: new FormControl(null, { validators: [Validators.required] }),
			}),
		},
		template: `
		<h1 class="sr-only">Date Picker form</h1><form [formGroup]="form" class="space-y-3 w-full max-w-sm">

			<caps-field>
				<caps-field-label>Date *</caps-field-label>
				<caps-date-picker
					formControlName="date"
					[captionLayout]="captionLayout"
					[minDate]="minDate"
					[maxDate]="maxDate">
					<caps-date-picker-trigger buttonId="date">Select a date</caps-date-picker-trigger>
				</caps-date-picker>

				<caps-field-description>Pick a date for the event so we can reserve the room.</caps-field-description>

				<caps-field-error>Select a date to continue.</caps-field-error>
			</caps-field>

			<div class="flex flex-wrap items-center gap-2">
				<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
			</div>
		</form>
		`,
	}),
};
