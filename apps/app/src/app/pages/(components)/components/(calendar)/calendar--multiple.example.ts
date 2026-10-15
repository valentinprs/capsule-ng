import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCalendarImports } from '@capsule-ng/caps/calendar';
import { CapsCardImports } from '@capsule-ng/caps/card';

@Component({
	selector: 'spartan-calendar-multiple',
	imports: [CapsCalendarImports, CapsCardImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'p-0 w-fit mx-auto',
	},
	template: `
		<caps-card class="p-0">
			<caps-card-content class="p-0">
				<caps-calendar-multi
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
	private readonly _today = new Date();

	/** The initial selection already satisfies minSelection=2. */
	public selectedDates = [
		this._today,
		new Date(this._today.getFullYear(), this._today.getMonth(), this._today.getDate() + 1),
	];

	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);
}
