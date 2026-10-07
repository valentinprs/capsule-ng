import { CapsCalendar, CapsCalendarImports, provideCapsCalendarI18n } from '@capsule-ng/caps/calendar';
import { componentWrapperDecorator, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

type CalendarArgs = {
	date: Date;
	min: Date;
	max: Date;
	disabled: boolean;
	captionLayout: 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years';
};
const meta: Meta<CalendarArgs> = {
	title: 'Calendar',
	component: CapsCalendar,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsCalendarImports],
			providers: [
				provideCapsCalendarI18n({
					formatHeader: (month, year) =>
						new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
					formatMonth: (month) => new Date(2000, month).toLocaleDateString('en-US', { month: 'short' }),
				}),
			],
		}),
		componentWrapperDecorator(
			(story) =>
				`<main class="preview flex w-full justify-center p-4"><h1 class="sr-only">Calendar</h1>${story}</main>`,
		),
	],
	args: {
		date: new Date(2024, 5, 1),
		min: new Date(2024, 4, 1),
		max: new Date(2024, 6, 1),
		disabled: false,
		captionLayout: 'label',
	},
	render: (args) => ({
		props: args,
		template: `<caps-calendar [(date)]="date" [min]="min" [max]="max" [disabled]="disabled" [captionLayout]="captionLayout" />`,
	}),
};
export default meta;
type Story = StoryObj<CalendarArgs>;
export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const Dropdown: Story = { args: { captionLayout: 'dropdown' } };
export const Multiple: Story = {
	render: () => ({
		props: { days: [new Date(2026, 9, 7)] },
		template: `<caps-calendar-multi [(date)]="days" [maxSelection]="3" [defaultFocusedDate]="days[0]" />`,
	}),
};
export const Range: Story = {
	render: () => ({
		props: { start: new Date(2026, 9, 7), end: new Date(2026, 9, 12) },
		template: `<caps-calendar-range [(startDate)]="start" [(endDate)]="end" />`,
	}),
};
export const MonthYear: Story = {
	render: (args) => ({
		props: args,
		template: `<caps-month-year-calendar [(date)]="date" view="month" [min]="min" [max]="max" />`,
	}),
};
export const Rtl: Story = {
	render: (args) => ({
		props: args,
		template: `<div dir="rtl"><caps-calendar [(date)]="date" captionLayout="dropdown" /></div>`,
	}),
};
