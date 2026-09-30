import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-field-set-preview',
	imports: [CapsFieldImports, CapsInputImports],
	host: {
		class: 'w-full max-w-md space-y-6',
	},
	template: `
		<fieldset capsFieldSet>
			<legend capsFieldLegend>Address Information</legend>
			<caps-field-description>Choose a unique username for your account.</caps-field-description>
			<caps-field-group>
				<caps-field>
					<label capsLabel for="field-set-street-address">Street Address</label>
					<input capsInput id="field-set-street-address" type="text" placeholder="123 Main St" />
				</caps-field>
				<div class="grid grid-cols-2 gap-4">
					<caps-field>
						<label capsLabel for="field-set-city">City</label>
						<input capsInput id="field-set-city" type="text" placeholder="Los Angeles" />
					</caps-field>
					<caps-field>
						<label capsLabel for="field-set-postal-code">Postal Code</label>
						<input capsInput id="field-set-postal-code" type="text" placeholder="90502" />
					</caps-field>
				</div>
			</caps-field-group>
		</fieldset>
	`,
})
export class FieldSetPreview {}
