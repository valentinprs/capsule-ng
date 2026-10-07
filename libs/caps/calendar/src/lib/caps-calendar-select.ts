import { Directive } from '@angular/core';
import { BrnCalendarMonthSelect, BrnCalendarYearSelect } from '@spartan-ng/brain/calendar';

/** @internal Bridge Brain's existing select logic without changing its selectors. */
@Directive({ selector: 'caps-select[capsCalendarMonthSelect]', hostDirectives: [BrnCalendarMonthSelect] })
export class CapsCalendarMonthSelect {}

/** @internal Bridge Brain's existing select logic without changing its selectors. */
@Directive({ selector: 'caps-select[capsCalendarYearSelect]', hostDirectives: [BrnCalendarYearSelect] })
export class CapsCalendarYearSelect {}
