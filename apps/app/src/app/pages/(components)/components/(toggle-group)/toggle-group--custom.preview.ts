import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsToggleGroupImports } from '@capsule-ng/caps/toggle-group';
import { hlmCode } from '@spartan-ng/helm/typography';

@Component({
	selector: 'spartan-toggle-group-custom',
	imports: [CapsToggleGroupImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Font Weight</caps-field-label>
			<caps-toggle-group variant="outline" spacing="2" size="lg" [(value)]="fontWeight">
				@for (weight of fontWeights; track $index) {
					<button
						capsToggleItem
						[value]="weight.value"
						[aria-label]="weight.label"
						class="flex size-16 flex-col items-center justify-center rounded-xl"
					>
						<span class="text-2xl leading-none" [class]="weight.class">Aa</span>
						<span class="text-muted-foreground text-xs">{{ weight.label }}</span>
					</button>
				}
			</caps-toggle-group>
			<caps-field-description>
				Use
				<code class="${hlmCode}">font-{{ fontWeight() }}</code>
				to set the font weight.
			</caps-field-description>
		</caps-field>
	`,
})
export class ToggleGroupCustomPreview {
	public fontWeights = [
		{ label: 'Light', value: 'light', class: 'font-light' },
		{ label: 'Normal', value: 'normal', class: 'font-normal' },
		{ label: 'Medium', value: 'medium', class: 'font-medium' },
		{ label: 'Bold', value: 'bold', class: 'font-bold' },
	];

	public fontWeight = signal('normal');
}
