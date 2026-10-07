import { Component, signal } from '@angular/core';
import { CapsSliderImports } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-slider-prevent-thumb-overlap',
	imports: [CapsSliderImports],
	styles: `
		:host {
			display: block;
			width: 60%;
		}
	`,
	template: `
		<caps-slider aria-label="Volume" [(value)]="value" [step]="10" [minStepsBetweenThumbs]="1" />
	`,
})
export class SliderPreventThumbOverlap {
	public readonly value = signal([20, 50]);
}
