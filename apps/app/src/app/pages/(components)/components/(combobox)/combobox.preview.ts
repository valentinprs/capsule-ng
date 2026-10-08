import { Component } from '@angular/core';
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';

@Component({
	selector: 'spartan-combobox-preview',
	imports: [CapsComboboxImports],
	template: `
		<caps-combobox>
			<caps-combobox-input placeholder="Select a framework" />
			<caps-combobox-content>
				<caps-combobox-empty>No items found.</caps-combobox-empty>

				@for (framework of frameworks; track $index) {
					<caps-combobox-option [value]="framework">{{ framework.label }}</caps-combobox-option>
				}
			</caps-combobox-content>
		</caps-combobox>
	`,
})
export class ComboboxPreview {
	public frameworks = [
		{
			label: 'AnalogJs',
			value: 'analogjs',
		},
		{
			label: 'Angular',
			value: 'angular',
		},
		{
			label: 'Vue',
			value: 'vue',
		},
		{
			label: 'Nuxt',
			value: 'nuxt',
		},
		{
			label: 'React',
			value: 'react',
		},
		{
			label: 'NextJs',
			value: 'nextjs',
		},
	];
}

export const defaultImports = `
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';
`;

export const defaultSkeleton = `
<caps-combobox>
	<caps-combobox-input placeholder="Select a framework" />
	<caps-combobox-content>
		<caps-combobox-empty>No items found.</caps-combobox-empty>
		@for (framework of frameworks; track $index) {
			<caps-combobox-option [value]="framework">{{ framework.label }}</caps-combobox-option>
		}
	</caps-combobox-content>
</caps-combobox>
`;

export const comboboxDefaultConfig = `
import { comboboxContainsFilter, provideCapsComboboxConfig } from '@capsule-ng/caps/combobox';

provideCapsComboboxConfig({
	filterOptions: {
		usage: 'search',
		sensitivity: 'base',
		ignorePunctuation: true,
	},
	filter: (itemValue: T, search: string, collator: Intl.Collator, itemToString?: ComboboxItemToString<T>) =>
		comboboxContainsFilter(itemValue, search, collator, itemToString),
	isItemEqualToValue: (itemValue: T, selectedValue: T | null) => Object.is(itemValue, selectedValue),
	itemToString: undefined,
});
`;
