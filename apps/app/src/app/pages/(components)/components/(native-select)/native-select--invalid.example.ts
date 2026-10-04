import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsNativeSelectImports } from '@capsule-ng/caps/native-select';
@Component({
	selector: 'spartan-native-select-invalid-example',
	imports: [CapsNativeSelectImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<select capsNativeSelect aria-label="Fruit" forceInvalid="true">
			<option value="">Error state</option>
			<option value="apple">Apple</option>
			<option value="banana">Banana</option>
			<option value="blueberry">Blueberry</option>
		</select>
	`,
})
export class NativeSelectInvalidExample {}
