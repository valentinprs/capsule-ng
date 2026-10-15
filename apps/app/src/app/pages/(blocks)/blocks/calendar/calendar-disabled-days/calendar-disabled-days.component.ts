import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsCalendar, injectCapsDateAdapter } from '@capsule-ng/caps/calendar';

@Component({
	selector: 'spartan-calendar-disabled-days',
	imports: [CapsCalendar],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex justify-center items-start p-3 md:p-20 w-full h-auto md:h-[600px] bg-surface rounded-lg overflow-auto',
	},
	template: `
		<caps-calendar class="bg-background" [min]="minDate" [max]="maxDate" [dateDisabled]="_dateDisabled" />
	`,
})
export class CalendarDisabledDaysComponent {
	/** Access the date adapter */
	protected readonly _dateAdapter = injectCapsDateAdapter();

	/** The minimum date */
	public minDate = new Date(2003, 1, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);

	protected readonly _dateDisabled = (date: Date): boolean => {
		return this._dateAdapter.isBefore(date, this._dateAdapter.startOfDay(this._dateAdapter.now()));
	};
}
