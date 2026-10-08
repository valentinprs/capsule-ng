import { ReactiveFormsModule } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { provideCapsCalendarI18n } from '@capsule-ng/caps/calendar';
import { CapsDatePickerImports, CapsMonthYearPicker } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

const meta: Meta<CapsMonthYearPicker<Date>> = {
	title: 'Month Year Picker',
	component: CapsMonthYearPicker,
	tags: ['autodocs'],
	args: {
		minDate: new Date(2020, 4, 1),
		maxDate: new Date(2030, 6, 1),
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
			<caps-month-year-picker [minDate]="minDate" [maxDate]="maxDate">
				<caps-date-picker-trigger buttonId="date">Pick a year and month</caps-date-picker-trigger>
			</caps-month-year-picker>
		</div>
		`,
	}),
};

export default meta;

type Story = StoryObj<CapsMonthYearPicker<Date>>;

const pad = (value: number): string => String(value).padStart(2, '0');

/** Display format (shown on blur / in the trigger) - `MM.yyyy`, distinct from the edit format. */
const formatDate = (date: Date): string => `${pad(date.getMonth() + 1)}.${date.getFullYear()}`;

/** Edit format (shown while focused) - `MM/yyyy`. */
const formatInputDate = (date: Date): string => `${pad(date.getMonth() + 1)}/${date.getFullYear()}`;

/** Parses `MM/yyyy`. Does not understand the display format on purpose. */
const parseDate = (value: string): Date | null => {
	const match = value.match(/^(\d{2})\/(\d{4})$/);
	if (!match) return null;
	const month = Number(match[1]);
	if (month < 1 || month > 12) return null;
	return new Date(Number(match[2]), month - 1, 1);
};

export const Default: Story = {
	args: { minDate: new Date(2020, 4, 1), maxDate: new Date(2030, 6, 1) },
};

export const Input: Story = {
	render: () => ({
		props: { formatDate, formatInputDate, parseDate },
		template: `
		<h1 class="sr-only">Date Picker demonstration</h1><div class="preview flex min-h-[350px] w-full justify-center p-10 items-center">
			<caps-month-year-picker #picker [formatDate]="formatDate">
				<caps-month-year-input
					inputId="date-input" aria-label="Month and year"
					placeholder="MM/yyyy"
					[parseDate]="parseDate"
					[formatInputDate]="formatInputDate"
				/>
				</caps-month-year-picker>
			<output id="date-trigger" [attr.data-placeholder]="picker.hasDate() ? null : ''">{{ picker.formattedDate() ?? 'unset' }}</output>
		</div>
		`,
	}),
};
