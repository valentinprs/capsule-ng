import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-date-picker-preview',
	imports: [CapsDatePickerImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Date of birth</caps-field-label>
			<caps-date-picker [minDate]="minDate" [maxDate]="maxDate">
				<caps-date-picker-trigger buttonId="date">Pick a date</caps-date-picker-trigger>
			</caps-date-picker>
		</caps-field>
	`,
})
export class DatePickerPreview {
	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);
}

export const defaultImports = `
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
`;

export const defaultSkeleton = `
<caps-date-picker [minDate]="minDate" [maxDate]="maxDate">
  <caps-date-picker-trigger buttonId="date">Pick a date</caps-date-picker-trigger>
</caps-date-picker>

`;
