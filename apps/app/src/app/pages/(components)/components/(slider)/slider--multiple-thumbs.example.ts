import { Component, signal } from '@angular/core';
import { CapsSliderImports } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-slider-multiple-thumbs',
	imports: [CapsSliderImports],
	styles: `
		:host {
			display: block;
			width: 60%;
		}
	`,
	template: `
		<caps-slider aria-label="Threshold" [thumbLabels]="['Low', 'Medium', 'High']" [(value)]="value" />
	`,
})
export class SliderMultipleThumbs {
	public readonly value = signal([10, 20, 70]);
}
