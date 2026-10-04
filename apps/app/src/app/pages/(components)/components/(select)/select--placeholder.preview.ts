import { Component } from '@angular/core';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCitrus } from '@ng-icons/lucide';
@Component({
	selector: 'spartan-select-placeholder-preview',
	imports: [CapsSelectImports, NgIcon],
	providers: [provideIcons({ lucideCitrus })],
	template: `
		<caps-select aria-label="Fruit" class="w-56">
			<ng-template capsSelectPlaceholder>
				<ng-icon name="lucideCitrus" />
				Select a fruit
			</ng-template>

			<caps-select-group label="Fruits">
				@for (fruit of fruits; track fruit.value) {
					<caps-select-option [value]="fruit">{{ fruit.label }}</caps-select-option>
				}
			</caps-select-group>
		</caps-select>
	`,
})
export class SelectPlaceholderPreview {
	public readonly fruits = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Blueberry', value: 'blueberry' },
		{ label: 'Grapes', value: 'grapes' },
		{ label: 'Pineapple', value: 'pineapple' },
	];
}
