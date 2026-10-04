import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { HlmCalendarImports } from '@spartan-ng/helm/calendar';

@Component({
	selector: 'spartan-calendar-multiple',
	imports: [HlmCalendarImports, CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'p-0 w-fit mx-auto',
	},
	template: `
		<caps-card class="p-0">
			<caps-card-content class="p-0">
				<hlm-calendar-multi
					[(date)]="selectedDates"
					[min]="minDate"
					[max]="maxDate"
					[minSelection]="2"
					[maxSelection]="6"
				/>
			</caps-card-content>
		</caps-card>
	`,
})
export class CalendarMultipleExample {
	/** The selected date */
	public selectedDates = [new Date()];

	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);
}
