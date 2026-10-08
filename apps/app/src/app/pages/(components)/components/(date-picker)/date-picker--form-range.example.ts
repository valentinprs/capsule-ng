import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-date-picker-form-range',
	imports: [FormRoot, FormField, CapsButtonImports, CapsDatePickerImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full max-w-xs' },
	template: `
		<form [formRoot]="form">
			<caps-field>
				<caps-field-label>Enter a date range</caps-field-label>
				<caps-date-range-picker
					[minDate]="minDate"
					[maxDate]="maxDate"
					[formField]="form.range"
					[autoCloseOnEndSelection]="true"
				>
					<caps-date-picker-trigger buttonId="date-range-form">Pick date range</caps-date-picker-trigger>
				</caps-date-range-picker>
			</caps-field>

			<button type="submit" capsButton [disabled]="form().submitting()">Submit</button>
		</form>
	`,
})
export class DatePickerFormRangeExample {
	protected readonly _model = signal<{ range: [Date, Date] | null }>({ range: null });

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.range, { message: 'Please select a date' });
		},
		{
			submission: {
				action: async () => {
					const model = this._model();
					console.log(model);
				},
			},
		},
	);

	/** The minimum date */
	public minDate = new Date(2023, 0, 1);

	/** The maximum date */
	public maxDate = new Date(2030, 11, 31);
}
