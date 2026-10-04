import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsNativeSelectImports } from '@capsule-ng/caps/native-select';
@Component({
	selector: 'spartan-field-native-select-preview',
	imports: [CapsFieldImports, CapsNativeSelectImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field-set>
			<caps-field-group>
				<caps-field>
					<caps-field-label>Department</caps-field-label>
					<select capsNativeSelect id="field-native-select-department">
						<option value="">Choose department</option>
						<option value="engineering">Engineering</option>
						<option value="design">Design</option>
						<option value="marketing">Marketing</option>
						<option value="sales">Sales</option>
						<option value="support">Customer Support</option>
						<option value="hr">Human Resources</option>
						<option value="finance">Finance</option>
						<option value="operations">Operations</option>
					</select>
					<caps-field-description>Select your department or area of work.</caps-field-description>
				</caps-field>
			</caps-field-group>
		</caps-field-set>
	`,
})
export class FieldNativeSelectPreview {}
