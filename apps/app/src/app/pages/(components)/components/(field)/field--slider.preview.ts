import { Component, signal } from '@angular/core';
import { CapsField, CapsFieldDescription, CapsFieldGroup, CapsFieldLabel, CapsFieldSet } from '@capsule-ng/caps/field';
import { HlmSliderImports } from '@spartan-ng/helm/slider';

@Component({
	selector: 'spartan-field-slider-preview',
	imports: [CapsFieldSet, CapsFieldGroup, CapsField, CapsFieldLabel, CapsFieldDescription, HlmSliderImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field-set>
			<caps-field-group>
				<caps-field>
					<caps-field-label>Price Range</caps-field-label>
					<caps-field-description>Set your budget range ($0 - {{ value() }}).</caps-field-description>
					<hlm-slider [max]="1000" [step]="10" [(value)]="value" />
				</caps-field>
			</caps-field-group>
		</caps-field-set>
	`,
})
export class FieldSliderPreview {
	public readonly value = signal([500]);
}
