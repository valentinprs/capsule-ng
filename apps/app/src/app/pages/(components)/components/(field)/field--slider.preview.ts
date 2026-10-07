import { Component, signal } from '@angular/core';
import { CapsField, CapsFieldDescription, CapsFieldLabel } from '@capsule-ng/caps/field';
import { CapsSliderImports } from '@capsule-ng/caps/slider';

@Component({
	selector: 'spartan-field-slider-preview',
	imports: [CapsField, CapsFieldLabel, CapsFieldDescription, CapsSliderImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field>
			<caps-field-label>Price Range</caps-field-label>
			<caps-field-description>Set your budget range ($0 - {{ value() }}).</caps-field-description>
			<caps-slider [max]="1000" [step]="10" [(value)]="value" />
		</caps-field>
	`,
})
export class FieldSliderPreview {
	public readonly value = signal([500]);
}
