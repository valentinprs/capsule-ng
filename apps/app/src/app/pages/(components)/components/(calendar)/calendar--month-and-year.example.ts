import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCalendarImports } from '@capsule-ng/caps/calendar';
import { CapsCardImports } from '@capsule-ng/caps/card';

@Component({
	selector: 'spartan-month-year-example',
	imports: [CapsCardImports, CapsCalendarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'p-0 w-fit mx-auto',
	},
	template: `
		<caps-card class="p-0">
			<caps-card-content class="p-0">
				<caps-month-year-calendar [(date)]="selectedDate" />
			</caps-card-content>
		</caps-card>
	`,
})
export class CalendarMonthAndYearExample {
	/** The selected date */
	public selectedDate = new Date();
}
