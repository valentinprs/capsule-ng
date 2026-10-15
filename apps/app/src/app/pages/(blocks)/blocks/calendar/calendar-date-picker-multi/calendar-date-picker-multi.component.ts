import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-calendar-date-picker-multi',
	imports: [FormRoot, FormField, CapsDatePickerImports, CapsButtonImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex justify-center p-3 md:p-20 w-full h-auto md:h-[600px] bg-surface rounded-lg overflow-auto',
	},
	template: `
		<form [formRoot]="form" class="w-full max-w-xs">
			<caps-field-group>
				<caps-field>
					<caps-field-label>Available dates</caps-field-label>
					<caps-date-picker-multi
						[minDate]="minDate"
						[maxDate]="maxDate"
						[formField]="form.availableDates"
						[autoCloseOnMaxSelection]="true"
						[minSelection]="2"
						[maxSelection]="4"
					>
						<caps-date-picker-trigger buttonId="availableDates">Pick dates</caps-date-picker-trigger>
					</caps-date-picker-multi>
				</caps-field>
				<button type="submit" capsButton [disabled]="form().submitting()">Submit</button>
			</caps-field-group>
		</form>
	`,
})
export class CalendarDatePickerMultiComponent {
	private readonly _model = signal<{ availableDates: Date[] }>({ availableDates: [] });

	public readonly form = form(
		this._model,
		(schemaPath) => {
			required(schemaPath.availableDates, { message: 'Please select a date' });
			minLength(schemaPath.availableDates, 1, { message: 'Select at least one date' });
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
