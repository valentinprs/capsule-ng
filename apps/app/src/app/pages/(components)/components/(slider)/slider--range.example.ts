import { Component, signal } from '@angular/core';
import { CapsSliderImports } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-slider-range',
	imports: [CapsSliderImports],
	styles: `
		:host {
			display: block;
			width: 60%;
		}
	`,
	template: `
		<caps-slider aria-label="Budget" [thumbLabels]="['Minimum', 'Maximum']" [(value)]="value" />
	`,
})
export class SliderRange {
	public readonly value = signal([25, 50]);
}
