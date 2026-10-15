import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';

@Component({
	selector: 'spartan-combobox-clear-preview',
	imports: [CapsComboboxImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-combobox>
			<caps-combobox-input placeholder="Select a framework" showClear />
			<caps-combobox-content>
				<caps-combobox-empty>No items found.</caps-combobox-empty>

				@for (framework of frameworks; track $index) {
					<caps-combobox-option [value]="framework">{{ framework }}</caps-combobox-option>
				}
			</caps-combobox-content>
		</caps-combobox>
	`,
})
export class ComboboxClearPreview {
	public frameworks = ['Analog', 'Angular', 'Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];
}
