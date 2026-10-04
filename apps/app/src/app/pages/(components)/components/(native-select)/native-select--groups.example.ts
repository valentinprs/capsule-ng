import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsNativeSelectImports } from '@capsule-ng/caps/native-select';
@Component({
	selector: 'spartan-native-select-groups-example',
	imports: [CapsNativeSelectImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<select capsNativeSelect aria-label="Fruit">
			<option value="">Select department</option>
			<optgroup label="Engineering">
				<option value="frontend">Frontend</option>
				<option value="backend">Backend</option>
				<option value="devops">DevOps</option>
			</optgroup>
			<optgroup label="Sales">
				<option value="sales-rep">Sales Rep</option>
				<option value="account-manager">Account Manager</option>
				<option value="sales-director">Sales Director</option>
			</optgroup>
			<optgroup label="Operations">
				<option value="support">Support</option>
				<option value="product-manager">Product Manager</option>
				<option value="ops-manager">Ops Manager</option>
			</optgroup>
		</select>
	`,
})
export class NativeSelectGroupsExample {}
