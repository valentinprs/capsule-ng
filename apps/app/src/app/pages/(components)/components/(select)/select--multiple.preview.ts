import { Component } from '@angular/core';
import { CapsSelectImports } from '@capsule-ng/caps/select';
@Component({
	selector: 'spartan-select-multiple-preview',
	imports: [CapsSelectImports],
	template: `
		<caps-select-multiple aria-label="Fruit" placeholder="Select fruits" class="w-56">
			<ng-template capsSelectValue let-values>
				{{ values[0].label }}
				@if (values.length > 1) {
					(+{{ values.length - 1 }} more)
				}
			</ng-template>

			<caps-select-group label="Fruits">
				@for (item of items; track item.value) {
					<caps-select-option [value]="item">{{ item.label }}</caps-select-option>
				}
			</caps-select-group>
		</caps-select-multiple>
	`,
})
export class SelectMultiplePreview {
	public readonly items = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Blueberry', value: 'blueberry' },
		{ label: 'Grapes', value: 'grapes' },
		{ label: 'Pineapple', value: 'pineapple' },
	];
}
