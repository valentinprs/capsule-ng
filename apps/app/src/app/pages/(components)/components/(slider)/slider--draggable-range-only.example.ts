import { Component, signal } from '@angular/core';
import { CapsSliderImports } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-slider-draggable-range-only',
	imports: [CapsSliderImports],
	styles: `
		:host {
			display: block;
			width: 60%;
		}
	`,
	template: `
		<caps-slider aria-label="Volume" [(value)]="value" [draggableRange]="true" [draggableRangeOnly]="true" />
	`,
})
export class SliderDraggableRangeOnly {
	public readonly value = signal([25, 50]);
}
