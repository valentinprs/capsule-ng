import { Component, signal } from '@angular/core';
import { CapsField, CapsFieldDescription, CapsFieldGroup, CapsFieldSet } from '@capsule-ng/caps/field';
import { CapsLabel } from '@capsule-ng/caps/label';
import { HlmSliderImports } from '@spartan-ng/helm/slider';

@Component({
	selector: 'spartan-field-slider-preview',
	imports: [CapsFieldSet, CapsFieldGroup, CapsField, CapsLabel, CapsFieldDescription, HlmSliderImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<fieldset capsFieldSet>
			<caps-field-group>
				<caps-field>
					<label capsLabel>Price Range</label>
					<caps-field-description>Set your budget range ($0 - {{ value() }}).</caps-field-description>
					<hlm-slider [max]="1000" [step]="10" [(value)]="value" />
				</caps-field>
			</caps-field-group>
		</fieldset>
	`,
})
export class FieldSliderPreview {
	public readonly value = signal([500]);
}
