import { Component } from '@angular/core';
import { CapsSelectImports } from '@capsule-ng/caps/select';
@Component({
	selector: 'spartan-select-group-preview',
	imports: [CapsSelectImports],
	template: `
		<caps-select aria-label="Fruit" placeholder="Select a fruit" class="w-56">
			<caps-select-group label="Fruits">
				@for (fruit of fruits; track fruit.value) {
					<caps-select-option [value]="fruit">{{ fruit.label }}</caps-select-option>
				}
			</caps-select-group>
			<caps-select-separator />
			<caps-select-group label="Vegetables">
				@for (vegetable of vegetables; track vegetable.value) {
					<caps-select-option [value]="vegetable">{{ vegetable.label }}</caps-select-option>
				}
			</caps-select-group>
		</caps-select>
	`,
})
export class SelectGroupPreview {
	public readonly fruits = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Blueberry', value: 'blueberry' },
		{ label: 'Grapes', value: 'grapes' },
		{ label: 'Pineapple', value: 'pineapple' },
	];
	public readonly vegetables = [
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' },
	];
}
