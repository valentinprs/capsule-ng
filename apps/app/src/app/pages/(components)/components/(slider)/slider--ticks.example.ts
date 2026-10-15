import { Component, signal } from '@angular/core';
import { CapsSliderImports } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-slider-ticks',
	imports: [CapsSliderImports],
	styles: `
		:host {
			display: block;
			width: 60%;
		}
	`,
	template: `
		<caps-slider aria-label="Volume" [(value)]="value" [showTicks]="true" />
	`,
})
export class SliderTicks {
	public readonly value = signal([50]);
}
