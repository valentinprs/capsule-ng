import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsComboboxImports } from '@capsule-ng/caps/combobox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-combobox-invalid-preview',
	imports: [CapsComboboxImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'w-full max-w-xs' },
	template: `
		<caps-field-group>
			<caps-field forceInvalid>
				<caps-field-label>Framework</caps-field-label>
				<caps-combobox>
					<caps-combobox-input forceInvalid placeholder="Select a framework" />
					<caps-combobox-content>
						<caps-combobox-empty>No items found.</caps-combobox-empty>

						@for (framework of frameworks; track $index) {
							<caps-combobox-option [value]="framework">{{ framework }}</caps-combobox-option>
						}
					</caps-combobox-content>
				</caps-combobox>
				<caps-field-error>Please select a framework.</caps-field-error>
			</caps-field>

			<caps-field forceInvalid>
				<caps-field-label>Frameworks</caps-field-label>
				<caps-combobox-multiple [(value)]="values">
					<caps-combobox-chips forceInvalid class="max-w-xs">
						<ng-template capsComboboxValues let-values>
							@for (value of values; track $index) {
								<caps-combobox-chip [value]="value">{{ value }}</caps-combobox-chip>
							}
						</ng-template>
						<input capsComboboxChipInput placeholder="Add frameworks" />
					</caps-combobox-chips>
					<caps-combobox-content>
						<caps-combobox-empty>No items found.</caps-combobox-empty>

						@for (framework of frameworks; track $index) {
							<caps-combobox-option [value]="framework">{{ framework }}</caps-combobox-option>
						}
					</caps-combobox-content>
				</caps-combobox-multiple>
				<caps-field-error>Please select at least one framework.</caps-field-error>
			</caps-field>

			<caps-field forceInvalid>
				<caps-field-label>Frameworks</caps-field-label>
				<caps-combobox>
					<caps-combobox-trigger forceInvalid class="w-full justify-between">
						<caps-combobox-value placeholder="Select a framework" />
					</caps-combobox-trigger>
					<caps-combobox-content>
						<caps-combobox-input showTrigger="false" placeholder="Search" showClear />
						<caps-combobox-empty>No items found.</caps-combobox-empty>

						@for (framework of frameworks; track $index) {
							<caps-combobox-option [value]="framework">{{ framework }}</caps-combobox-option>
						}
					</caps-combobox-content>
				</caps-combobox>
			</caps-field>
		</caps-field-group>
	`,
})
export class ComboboxInvalidPreview {
	public values = signal<string[]>(['Angular']);

	public frameworks = ['Analog', 'Angular', 'Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];
}
