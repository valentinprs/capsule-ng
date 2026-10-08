import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsDatePickerImports, provideCapsDatePickerConfig } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { DateTime } from 'luxon';

@Component({
	selector: 'spartan-date-picker-format',
	imports: [CapsDatePickerImports, CapsFieldImports],
	providers: [
		// Global formatDate config
		provideCapsDatePickerConfig({ formatDate: (date: Date) => DateTime.fromJSDate(date).toFormat('dd.MM.yyyy') }),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Date Picker with Custom Format</caps-field-label>
			<caps-date-picker [minDate]="minDate" [maxDate]="maxDate" [formatDate]="formatDate">
				<caps-date-picker-trigger buttonId="date-format">Pick a date</caps-date-picker-trigger>
			</caps-date-picker>
		</caps-field>
	`,
})
export class DatePickerFormatExample {
	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);

	/** Overrides global formatDate  */
	public formatDate = (date: Date) => DateTime.fromJSDate(date).toFormat('MMMM dd, yyyy');
}
