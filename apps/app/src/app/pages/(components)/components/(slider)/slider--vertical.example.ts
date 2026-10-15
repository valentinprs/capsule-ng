import { Component, signal } from '@angular/core';
import { CapsSliderImports } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-slider-vertical',
	imports: [CapsSliderImports],
	styles: `
		:host {
			display: flex;
			gap: 1.5rem;
		}
	`,
	template: `
		<caps-slider aria-label="Volume" [(value)]="value" orientation="vertical" />
		<caps-slider aria-label="Balance" [(value)]="value2" orientation="vertical" />
	`,
})
export class SliderVertical {
	public readonly value = signal([50]);
	public readonly value2 = signal([25]);
}
