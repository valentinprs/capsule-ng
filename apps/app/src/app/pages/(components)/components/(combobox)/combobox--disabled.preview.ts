import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';

@Component({
	selector: 'spartan-combobox-disabled-preview',
	imports: [CapsComboboxImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-combobox disabled>
			<caps-combobox-input placeholder="Select a framework" />
			<caps-combobox-content>
				<caps-combobox-empty>No items found.</caps-combobox-empty>

				@for (framework of frameworks; track $index) {
					<caps-combobox-option [value]="framework">{{ framework }}</caps-combobox-option>
				}
			</caps-combobox-content>
		</caps-combobox>
	`,
})
export class ComboboxDisabledPreview {
	public frameworks = ['Analog', 'Angular', 'Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];
}
