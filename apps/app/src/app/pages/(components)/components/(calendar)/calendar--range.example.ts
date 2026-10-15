import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCalendarImports } from '@capsule-ng/caps/calendar';
import { CapsCardImports } from '@capsule-ng/caps/card';

@Component({
	selector: 'spartan-calendar-range',
	imports: [CapsCalendarImports, CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'p-0 w-fit mx-auto',
	},
	template: `
		<caps-card class="p-0">
			<caps-card-content class="p-0">
				<caps-calendar-range [(startDate)]="start" [(endDate)]="end" [min]="minDate" [max]="maxDate" />
			</caps-card-content>
		</caps-card>
	`,
})
export class CalendarRangeExample {
	/** The selected date */
	public start = new Date();
	public end = new Date(this.start.getTime() + 5 * 24 * 60 * 60 * 1000);

	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);
}
