import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmNativeSelectImports } from '@spartan-ng/helm/native-select';

@Component({
	selector: 'spartan-field-native-select-preview',
	imports: [CapsFieldImports, HlmNativeSelectImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<fieldset capsFieldSet>
			<caps-field-group>
				<caps-field>
					<label capsLabel for="field-native-select-department">Department</label>
					<hlm-native-select selectId="field-native-select-department">
						<option hlmNativeSelectOption value="">Choose department</option>
						<option hlmNativeSelectOption value="engineering">Engineering</option>
						<option hlmNativeSelectOption value="design">Design</option>
						<option hlmNativeSelectOption value="marketing">Marketing</option>
						<option hlmNativeSelectOption value="sales">Sales</option>
						<option hlmNativeSelectOption value="support">Customer Support</option>
						<option hlmNativeSelectOption value="hr">Human Resources</option>
						<option hlmNativeSelectOption value="finance">Finance</option>
						<option hlmNativeSelectOption value="operations">Operations</option>
					</hlm-native-select>
					<caps-field-description>Select your department or area of work.</caps-field-description>
				</caps-field>
			</caps-field-group>
		</fieldset>
	`,
})
export class FieldNativeSelectPreview {}
