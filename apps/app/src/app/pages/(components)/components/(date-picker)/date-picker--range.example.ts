import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-date-picker-range',
	imports: [CapsDatePickerImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Date Picker Range</caps-field-label>
			<caps-date-range-picker [minDate]="minDate" [maxDate]="maxDate" [autoCloseOnEndSelection]="true">
				<caps-date-picker-trigger buttonId="date-range-picker">Enter a date range</caps-date-picker-trigger>
			</caps-date-range-picker>
		</caps-field>
	`,
})
export class DatePickerRangeExample {
	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);
}
