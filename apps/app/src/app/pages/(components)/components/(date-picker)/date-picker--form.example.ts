import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-date-picker-form',
	imports: [CapsDatePickerImports, FormRoot, FormField, CapsButtonImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<form [formRoot]="form">
			<caps-field>
				<caps-field-label>Date of birth</caps-field-label>
				<caps-date-picker
					[minDate]="minDate"
					[maxDate]="maxDate"
					captionLayout="dropdown"
					[formField]="form.birthday"
					[autoCloseOnSelect]="true"
				>
					<caps-date-picker-trigger buttonId="date-birthday">Pick a date</caps-date-picker-trigger>
				</caps-date-picker>
				<caps-field-description>Your date of birth is used to calculate your age.</caps-field-description>
			</caps-field>
			<button type="submit" capsButton [disabled]="form().submitting()">Submit</button>
		</form>
	`,
})
export class DatePickerFormExample {
	protected readonly _model = signal<{ birthday: Date | null }>({ birthday: null });

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.birthday, { message: 'Please select a date' });
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
