import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsDatePickerImports } from '@capsule-ng/caps/date-picker';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-field-date-picker-preview',
	imports: [CapsDatePickerImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<caps-field>
			<caps-field-label>Date of birth</caps-field-label>
			<caps-date-picker captionLayout="dropdown">
				<caps-date-picker-trigger buttonId="date-range">Enter your date of birth</caps-date-picker-trigger>
			</caps-date-picker>
		</caps-field>
	`,
})
export class FieldDatePickerPreview {}
