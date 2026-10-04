import { Component } from '@angular/core';
import { CapsSelectImports } from '@capsule-ng/caps/select';
@Component({
	selector: 'spartan-select-disabled-preview',
	imports: [CapsSelectImports],
	template: `
		<caps-select aria-label="Fruit" disabled placeholder="Select a fruit" class="w-56">
			<caps-select-group label="Fruits">
				@for (item of items; track item.value) {
					<caps-select-option [value]="item.value">{{ item.label }}</caps-select-option>
				}
			</caps-select-group>
		</caps-select>
	`,
})
export class SelectDisabledPreview {
	public readonly items = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Blueberry', value: 'blueberry' },
		{ label: 'Grapes', value: 'grapes' },
		{ label: 'Pineapple', value: 'pineapple' },
	];
}
