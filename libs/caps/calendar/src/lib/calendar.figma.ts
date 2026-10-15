// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1999-6911
// source=libs/caps/calendar/src/lib/caps-calendar.ts
// component=CapsCalendar
import figma from 'figma';

const calendar = figma.selectedInstance;

// The header type of the nested `.Calendar / Header` is the `captionLayout` (month / year
// dropdowns). Not mapped: `Months` (`caps-calendar` shows one month; there is no number-of-months
// input), and the selected / disabled days (the `date`, `min`, `max` and `dateDisabled` inputs are data).
const header = calendar.findInstance('.Calendar / Header');
const layout =
	header.type === 'INSTANCE'
		? (header.getEnum('Type', {
				'Year and month': ' captionLayout="dropdown"',
				'Only month': ' captionLayout="dropdown-months"',
				'Only year': ' captionLayout="dropdown-years"',
			}) ?? '')
		: '';

export default {
	example: figma.code`<caps-calendar [(date)]="date"${layout} />`,
	imports: ["import { CapsCalendarImports } from '@capsule-ng/caps/calendar';"],
	id: 'caps-calendar',
};
