import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSelectImports } from '@capsule-ng/caps/select';
@Component({
	selector: 'spartan-select-invalid-preview',
	imports: [CapsSelectImports, CapsFieldImports],
	template: `
		<caps-field forceInvalid class="w-56">
			<caps-field-label>Fruit</caps-field-label>
			<caps-select placeholder="Select a fruit" forceInvalid id="select-invalid" class="w-full">
				<caps-select-group label="Fruits">
					@for (item of items; track item.value) {
						<caps-select-option [value]="item.value">{{ item.label }}</caps-select-option>
					}
				</caps-select-group>
			</caps-select>
			<caps-field-error forceShow>Please select a fruit.</caps-field-error>
		</caps-field>
	`,
})
export class SelectInvalidPreview {
	public readonly items = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Blueberry', value: 'blueberry' },
		{ label: 'Grapes', value: 'grapes' },
		{ label: 'Pineapple', value: 'pineapple' },
	];
}
