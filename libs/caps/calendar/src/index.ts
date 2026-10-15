import { CapsCalendar } from './lib/caps-calendar';
import { CapsCalendarMulti } from './lib/caps-calendar-multi';
import { CapsCalendarRange } from './lib/caps-calendar-range';
import { CapsMonthYearCalendar } from './lib/caps-month-year-calendar';

export * from './lib/caps-calendar';
export * from './lib/caps-calendar-multi';
export * from './lib/caps-calendar-range';
export * from './lib/caps-month-year-calendar';

export const CapsCalendarImports = [CapsCalendar, CapsCalendarMulti, CapsCalendarRange, CapsMonthYearCalendar] as const;

// Existing Brain configuration exposed through the Calendar entrypoint.
export {
	BrnCalendarI18nService as CapsCalendarI18nService,
	injectBrnCalendarI18n as injectCapsCalendarI18n,
	provideBrnCalendarI18n as provideCapsCalendarI18n,
	type BrnCalendarI18n as CapsCalendarI18n,
	type MonthLabels,
	type Weekday,
} from '@spartan-ng/brain/calendar';
export {
	BrnJalaliDateAdapter as CapsJalaliDateAdapter,
	BrnNativeDateAdapter as CapsNativeDateAdapter,
	BrnUtcDateAdapter as CapsUtcDateAdapter,
	injectDateAdapter as injectCapsDateAdapter,
	JalaliDate,
	PersianDate,
	provideDateAdapter as provideCapsDateAdapter,
	provideNativeDateAdapter as provideCapsNativeDateAdapter,
	provideUtcDateAdapter as provideCapsUtcDateAdapter,
	type BrnDateAdapter as CapsDateAdapter,
} from '@spartan-ng/brain/date-time';
