import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-date-month-year-picker',
	imports: [CapsDatePickerImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Month Year Picker</caps-field-label>
			<caps-month-year-picker [minDate]="minDate" [maxDate]="maxDate" autoCloseOnSelect>
				<caps-date-picker-trigger>Pick a year and month</caps-date-picker-trigger>
			</caps-month-year-picker>
		</caps-field>
	`,
})
export class DatePickerMonthYearExample {
	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);
}
