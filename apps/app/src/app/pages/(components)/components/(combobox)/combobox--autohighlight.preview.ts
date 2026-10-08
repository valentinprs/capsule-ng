import { Component } from '@angular/core';
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';

@Component({
	selector: 'spartan-combobox-autohighlight-preview',
	imports: [CapsComboboxImports],
	template: `
		<caps-combobox autoHighlight>
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
export class ComboboxAutoHighlightPreview {
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
