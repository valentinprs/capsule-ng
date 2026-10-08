import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsDatePickerImports, provideCapsDatePickerConfig } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { DateTime } from 'luxon';

@Component({
	selector: 'spartan-date-picker-config',
	imports: [CapsDatePickerImports, CapsFieldImports],
	providers: [
		provideCapsDatePickerConfig({
			formatDate: (date: Date) => DateTime.fromJSDate(date).toFormat('dd.MM.yyyy'),
			transformDate: (date: Date) => DateTime.fromJSDate(date).plus({ days: 1 }).toJSDate(),
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Date Picker with Config</caps-field-label>
			<caps-date-picker [minDate]="minDate" [maxDate]="maxDate">
				<caps-date-picker-trigger buttonId="date-custom-config">Pick a date</caps-date-picker-trigger>
			</caps-date-picker>
		</caps-field>
	`,
})
export class DatePickerConfigExample {
	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);
}
