import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCalendarMulti } from '@capsule-ng/caps/calendar';

@Component({
	selector: 'spartan-calendar-multi',
	imports: [CapsCalendarMulti],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex justify-center items-start p-3 md:p-20 w-full h-auto md:h-[600px] bg-surface rounded-lg overflow-auto',
	},
	template: `
		<caps-calendar-multi
			[(date)]="selectedDates"
			[min]="minDate"
			[max]="maxDate"
			[minSelection]="2"
			[maxSelection]="6"
			class="bg-background"
		/>
	`,
})
export class CalendarMultiComponent {
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
