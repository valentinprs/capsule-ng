import { Component, signal } from '@angular/core';
import { CapsSliderImports } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-slider-preview',
	imports: [CapsSliderImports],
	styles: `
		:host {
			display: block;
			width: 60%;
		}
	`,
	template: `
		<caps-slider aria-label="Volume" [(value)]="value" />
	`,
})
export class SliderPreview {
	public readonly value = signal([75]);
}

export const defaultImports = `
import { CapsSliderImports } from '@capsule-ng/caps/slider';
`;
export const defaultSkeleton = `
<caps-slider aria-label="Volume" />
`;
