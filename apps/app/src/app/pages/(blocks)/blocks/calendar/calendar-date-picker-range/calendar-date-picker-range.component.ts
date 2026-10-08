import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-calendar-date-picker-range',
	imports: [FormRoot, FormField, CapsDatePickerImports, CapsFieldImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex justify-center p-3 md:p-20 w-full h-auto md:h-[600px] bg-surface rounded-lg overflow-auto',
	},
	template: `
		<form [formRoot]="form" class="w-full max-w-xs">
			<caps-field-group>
				<caps-field>
					<caps-field-label>Enter a date range</caps-field-label>
					<caps-date-range-picker
						[minDate]="minDate"
						[maxDate]="maxDate"
						[formField]="form.range"
						[autoCloseOnEndSelection]="true"
					>
						<caps-date-picker-trigger buttonId="dateRange">Enter a date range</caps-date-picker-trigger>
					</caps-date-range-picker>
				</caps-field>
				<button type="submit" capsButton [disabled]="form().submitting()">Submit</button>
			</caps-field-group>
		</form>
	`,
})
export class CalendarDatePickerRangeComponent {
	private readonly _model = signal<{ range: [Date, Date] | null }>({ range: null });

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.range, { message: 'Please select a date range' });
		},
		{
			submission: {
				action: async () => {
					console.log(this._model());
				},
			},
		},
	);

	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);
}
