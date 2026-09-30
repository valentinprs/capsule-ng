import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDatePickerImports } from '@spartan-ng/helm/date-picker';

@Component({
	selector: 'spartan-field-date-picker-preview',
	imports: [HlmButtonImports, HlmDatePickerImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full max-w-xs',
	},
	template: `
		<fieldset capsFieldSet>
			<caps-field-group>
				<caps-field>
					<label capsLabel for="date-range">Date of birth</label>
					<hlm-date-picker buttonId="date-range" captionLayout="dropdown">
						<span>Enter your date of birth</span>
					</hlm-date-picker>
				</caps-field>
			</caps-field-group>
		</fieldset>
	`,
})
export class FieldDatePickerPreview {}
