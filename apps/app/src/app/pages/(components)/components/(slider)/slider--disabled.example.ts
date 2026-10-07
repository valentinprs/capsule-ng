import { Component, signal } from '@angular/core';
import { CapsSliderImports } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-slider-disabled',
	imports: [CapsSliderImports],
	styles: `
		:host {
			display: block;
			width: 60%;
		}
	`,
	template: `
		<caps-slider aria-label="Volume" [(value)]="value" [disabled]="true" />
	`,
})
export class SliderDisabled {
	public readonly value = signal([50]);
}
