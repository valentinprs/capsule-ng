import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-calendar-date-picker',
	imports: [CapsDatePickerImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex justify-center p-3 md:p-20 w-full h-auto md:h-[600px] bg-surface rounded-lg overflow-auto',
	},
	template: `
		<caps-field class="max-w-xs">
			<caps-field-label>Date Picker</caps-field-label>
			<caps-date-picker [(date)]="selectedDates" [minDate]="minDate" [maxDate]="maxDate">
				<caps-date-picker-trigger buttonId="datePicker">Pick dates</caps-date-picker-trigger>
			</caps-date-picker>
		</caps-field>
	`,
})
export class CalendarDatePickerComponent {
	/** The selected date */
	public selectedDates = new Date();

	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);
}
