import { Component, signal } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSliderImports } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-slider-ticks-with-label',
	imports: [CapsSliderImports, CapsFieldImports],
	styles: `
		:host {
			display: block;
			width: 60%;
		}
	`,
	template: `
		<caps-field>
			<caps-field-label>Volume</caps-field-label>
			<caps-slider [(value)]="value" [showTicks]="true" />
		</caps-field>
	`,
})
export class SliderTicksWithLabel {
	public readonly value = signal([50]);
}
