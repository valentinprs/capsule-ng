import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-calendar-date-and-time-picker',
	imports: [CapsDatePickerImports, CapsFieldImports, CapsInputImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex justify-center p-3 md:p-20 w-full h-auto md:h-[600px] bg-surface rounded-lg overflow-auto',
	},
	template: `
		<caps-field-group class="mx-auto max-w-xs flex-row">
			<caps-field>
				<caps-field-label>Date</caps-field-label>
				<caps-date-picker [minDate]="minDate" [maxDate]="maxDate">
					<caps-date-picker-trigger buttonId="date-picker">Select date</caps-date-picker-trigger>
				</caps-date-picker>
			</caps-field>

			<caps-field>
				<caps-field-label>Time</caps-field-label>
				<input
					capsInput
					id="time-picker"
					type="time"
					step="1"
					[defaultValue]="'10:30:00'"
					class="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
				/>
			</caps-field>
		</caps-field-group>
	`,
})
export class CalendarDateAndTimePickerComponent {
	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);
}
