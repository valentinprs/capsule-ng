import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';

@Component({
	selector: 'spartan-combobox-multiple-autohighlight-preview',
	imports: [CapsComboboxImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-combobox-multiple [(value)]="values" autoHighlight>
			<caps-combobox-chips class="max-w-xs">
				<ng-template capsComboboxValues let-values>
					@for (value of values; track $index) {
						<caps-combobox-chip [value]="value">{{ value }}</caps-combobox-chip>
					}
				</ng-template>

				<input capsComboboxChipInput aria-label="Search frameworks" />
			</caps-combobox-chips>
			<caps-combobox-content>
				<caps-combobox-empty>No items found.</caps-combobox-empty>

				@for (framework of frameworks; track $index) {
					<caps-combobox-option [value]="framework">{{ framework }}</caps-combobox-option>
				}
			</caps-combobox-content>
		</caps-combobox-multiple>
	`,
})
export class ComboboxMultipleAutoHighlightPreview {
	public values = signal(['Angular']);

	public frameworks = ['Analog', 'Angular', 'Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];
}
