import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { DateTime } from 'luxon';

@Component({
	selector: 'spartan-calendar-date-picker-with-button',
	imports: [CapsFieldImports, CapsDatePickerImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex justify-center p-3 md:p-20 w-full h-auto md:h-[600px] bg-surface rounded-lg overflow-auto',
	},
	template: `
		<caps-field class="max-w-xs">
			<caps-field-label>Date Picker with Button</caps-field-label>
			<caps-date-picker #datePicker [minDate]="minDate" [maxDate]="maxDate" [formatDate]="formatDate">
				<caps-date-picker-trigger buttonId="datePickerWithButton">Pick a date</caps-date-picker-trigger>
				<div capsDatePickerFooter class="flex justify-end gap-2 p-2">
					<button capsButton (click)="datePicker.close()">Submit</button>
					<button capsButton (click)="datePicker.reset()">Clear</button>
				</div>
			</caps-date-picker>
		</caps-field>
	`,
})
export class CalendarDatePickerWithButtonComponent {
	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);

	/** Overrides global formatDate  */
	public formatDate = (date: Date) => DateTime.fromJSDate(date).toFormat('MMMM dd, yyyy');
}
