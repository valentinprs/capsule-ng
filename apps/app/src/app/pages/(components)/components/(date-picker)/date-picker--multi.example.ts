import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-date-picker-multiple',
	imports: [CapsDatePickerImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Date Picker Multiple</caps-field-label>
			<caps-date-picker-multi
				[minDate]="minDate"
				[maxDate]="maxDate"
				[autoCloseOnMaxSelection]="true"
				[minSelection]="2"
				[maxSelection]="6"
			>
				<caps-date-picker-trigger buttonId="date-multi">Pick dates</caps-date-picker-trigger>
			</caps-date-picker-multi>
		</caps-field>
	`,
})
export class DatePickerMultipleExample {
	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);
}
