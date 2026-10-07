import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSliderImports } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-temperature-selector',
	imports: [CapsSliderImports, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'block',
	},
	template: `
		<caps-field>
			<div class="flex justify-between">
				<caps-field-label>Temperature</caps-field-label>
				<span
					class="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm"
				>
					{{ value() }}
				</span>
			</div>
			<caps-slider [step]="0.01" [min]="0" [max]="1" [(value)]="value" class="w-full" />
		</caps-field>
	`,
})
export class TemperatureSelector {
	public readonly value = signal<number[]>([0.64]);
}
