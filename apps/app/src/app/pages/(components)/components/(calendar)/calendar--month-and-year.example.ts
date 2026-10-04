import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { HlmCalendarImports } from '@spartan-ng/helm/calendar';

@Component({
	selector: 'spartan-month-year-example',
	imports: [CapsCardImports, HlmCalendarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'p-0 w-fit mx-auto',
	},
	template: `
		<caps-card class="p-0">
			<caps-card-content class="p-0">
				<hlm-month-year-calendar [(date)]="selectedDate" />
			</caps-card-content>
		</caps-card>
	`,
})
export class CalendarMonthAndYearExample {
	/** The selected date */
	public selectedDate = new Date();
}
