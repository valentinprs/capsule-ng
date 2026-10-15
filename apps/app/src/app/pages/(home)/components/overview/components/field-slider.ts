import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSlider } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-field-slider',
	imports: [CapsSlider, CapsFieldImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-field>
			<caps-field-label>Price Range</caps-field-label>
			<caps-field-description>Set your budget range ($0 - {{ sliderValue() }}).</caps-field-description>
			<caps-slider [max]="1000" [step]="10" [(value)]="sliderValue" />
		</caps-field>
	`,
})
export class FieldSlider {
	public readonly sliderValue = signal([500]);
}
