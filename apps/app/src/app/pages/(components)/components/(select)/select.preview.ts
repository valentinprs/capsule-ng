import { Component } from '@angular/core';
import { CapsSelectImports } from '@capsule-ng/caps/select';
@Component({
	selector: 'spartan-select-preview',
	imports: [CapsSelectImports],
	template: `
		<caps-select aria-label="Fruit" [itemToString]="itemToString" placeholder="Select a fruit" class="w-56">
			<caps-select-group label="Fruits">
				@for (item of items; track item.value) {
					<caps-select-option [value]="item.value">{{ item.label }}</caps-select-option>
				}
			</caps-select-group>
		</caps-select>
	`,
})
export class SelectPreview {
	public readonly items = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Blueberry', value: 'blueberry' },
		{ label: 'Grapes', value: 'grapes' },
		{ label: 'Pineapple', value: 'pineapple' },
	];

	public readonly itemToString = (value: string) => this.items.find((item) => item.value === value)?.label || '';
}

export const defaultImports = `
import { CapsSelectImports } from '@capsule-ng/caps/select';
`;

export const defaultSkeleton = `
<caps-select aria-label="Fruit"   placeholder="Select a fruit"  >

		<caps-select-group label="Fruits">
			@for (item of items; track item.value) {
				<caps-select-option [value]="item.value">{{ item.label }}</caps-select-option>
			}
		</caps-select-group>
</caps-select>
`;

export const defaultStyles = `
@import '@angular/cdk/overlay-prebuilt.css';
`;
