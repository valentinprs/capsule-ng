import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { provideCapsCalendarI18n } from '@capsule-ng/caps/calendar';
import { CapsDatePickerImports, CapsDateRangePicker } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsDateRangePicker<Date>> = {
	title: 'Date Range Picker',
	component: CapsDateRangePicker,
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
			<caps-date-range-picker [minDate]="minDate" [maxDate]="maxDate" [captionLayout]="captionLayout">
                <caps-date-picker-trigger buttonId="date">Pick a date range</caps-date-picker-trigger>
            </caps-date-range-picker>
		</div>
		`,
	}),
};

export default meta;

type Story = StoryObj<CapsDateRangePicker<Date>>;

const pad = (value: number): string => String(value).padStart(2, '0');
const toInput = (date: Date): string => `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;

/** Display format (shown on blur / in the trigger) - intentionally distinct from the edit format. */
const formatDates = (dates: [Date | null, Date | null]): string =>
	dates
		.filter((date): date is Date => !!date)
		.map((date) => date.toDateString())
		.join(' to ');

/** Edit format (shown while focused) - `dd/MM/yyyy - dd/MM/yyyy`. */
const formatInputDates = (dates: [Date | null, Date | null]): string =>
	dates
		.filter((date): date is Date => !!date)
		.map(toInput)
		.join(' - ');

/** Parses `dd/MM/yyyy - dd/MM/yyyy`. Does not understand the display format on purpose. */
const parseDate = (value: string): [Date, Date] | null => {
	const parts = value.split(' - ').map((part) => part.trim());
	if (parts.length !== 2) return null;

	const dates = parts.map((part) => {
		const match = part.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
		if (!match) return undefined;
		const date = new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
		return isNaN(date.getTime()) ? undefined : date;
	});

	if (!dates[0] || !dates[1]) return null;
	return [dates[0], dates[1]];
};

export const Default: Story = {
	args: { minDate: new Date(2020, 4, 1), maxDate: new Date(2030, 6, 1), captionLayout: 'label' },
};

export const Input: Story = {
	render: () => ({
		props: { formatDates, formatInputDates, parseDate },
		template: `
		<h1 class="sr-only">Date Picker demonstration</h1><div class="preview flex min-h-[350px] w-full justify-center p-10 items-center">
			<caps-date-range-picker #picker [formatDates]="formatDates">
				<caps-date-range-input
					inputId="date-input" aria-label="Range"
					placeholder="dd/MM/yyyy - dd/MM/yyyy"
					[parseDate]="parseDate"
					[formatInputDates]="formatInputDates"
				/>
				</caps-date-range-picker>
			<output id="date-trigger" [attr.data-placeholder]="picker.hasDate() ? null : ''">{{ picker.formattedDate() ?? 'unset' }}</output>
		</div>
		`,
	}),
};

export const WithHintAndError: Story = {
	render: (args) => ({
		props: {
			...args,
			form: new FormGroup({
				dateRange: new FormControl(null, { validators: [Validators.required] }),
			}),
		},
		template: `
		<h1 class="sr-only">Date Picker form</h1><form [formGroup]="form" class="space-y-3 w-full max-w-sm">
			<caps-field>
				<caps-field-label>Date Range *</caps-field-label>
				<caps-date-range-picker
					formControlName="dateRange"
					[captionLayout]="captionLayout"
					[minDate]="minDate"
					[maxDate]="maxDate">
					<caps-date-picker-trigger buttonId="date">Select a date range</caps-date-picker-trigger>
				</caps-date-range-picker>

				<caps-field-description>Pick a start and end date for your booking.</caps-field-description>

				<caps-field-error>Select a date range to continue.</caps-field-error>
			</caps-field>

			<div class="flex flex-wrap items-center gap-2">
				<button capsButton type="button" (click)="form.markAllAsTouched()">Validate</button>
				<button capsButton variant="outline" type="button" (click)="form.reset()">Reset</button>
			</div>
		</form>
		`,
	}),
};
