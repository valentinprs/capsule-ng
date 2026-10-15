import {
	type CapsCalendarI18n,
	CapsJalaliDateAdapter,
	type JalaliDate,
	type MonthLabels,
	provideCapsCalendarI18n,
	provideCapsDateAdapter,
} from '@capsule-ng/caps/calendar';
import { CapsDatePicker, CapsDatePickerImports, provideCapsDatePickerConfig } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

const JALALI_MONTHS = [
	'فروردین',
	'اردیبهشت',
	'خرداد',
	'تیر',
	'مرداد',
	'شهریور',
	'مهر',
	'آبان',
	'آذر',
	'دی',
	'بهمن',
	'اسفند',
] as MonthLabels;

const jalaliCalendarI18n: CapsCalendarI18n = {
	formatWeekdayName: (i) => ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'][i],
	months: () => JALALI_MONTHS,
	years: (startYear = 1300, endYear = 1420) => Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i),
	formatHeader: (month, year) => JALALI_MONTHS[month] + ` ${year}`,
	formatMonth: (m) => JALALI_MONTHS[m],
	formatYear: (y) => `${y}`,
	labelPrevious: () => 'ماه قبل',
	labelNext: () => 'ماه بعد',
	labelWeekday: (i) => ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'][i],
	firstDayOfWeek: () => 6,
};

const meta: Meta<CapsDatePicker<JalaliDate>> = {
	title: 'Date Picker / Jalali (Persian)',
	component: CapsDatePicker,
	tags: ['autodocs'],
	args: {
		captionLayout: 'dropdown',
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
			imports: [CapsDatePickerImports, CapsFieldImports],
			providers: [
				provideCapsDateAdapter(CapsJalaliDateAdapter),
				provideCapsCalendarI18n(jalaliCalendarI18n),
				provideCapsDatePickerConfig({
					formatDate: (date: JalaliDate) =>
						`${date.year}/${String(date.month).padStart(2, '0')}/${String(date.day).padStart(2, '0')}`,
				}),
			],
		}),
	],
	render: ({ ...args }) => ({
		props: args,
		template: `
		<h1 class="sr-only">Date Picker demonstration</h1><div class="preview flex min-h-[350px] w-full justify-center p-10 items-center" dir="rtl" lang="fa" data-lang="ar">
			<caps-date-picker [captionLayout]="captionLayout">
                <caps-date-picker-trigger buttonId="date-jalali">انتخاب تاریخ</caps-date-picker-trigger>
            </caps-date-picker>
		</div>
		`,
	}),
};

export default meta;

type Story = StoryObj<CapsDatePicker<JalaliDate>>;

export const Default: Story = {
	args: { captionLayout: 'dropdown' },
};
