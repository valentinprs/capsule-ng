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
		<caps-field-set>
			<caps-field-legend>Address Information</caps-field-legend>
			<caps-field-description>Choose a unique username for your account.</caps-field-description>
			<caps-field-group>
				<caps-field>
					<caps-field-label for="field-set-street-address">Street Address</caps-field-label>
					<input capsInput id="field-set-street-address" type="text" placeholder="123 Main St" />
				</caps-field>
				<div class="grid grid-cols-2 gap-4">
					<caps-field>
						<caps-field-label for="field-set-city">City</caps-field-label>
						<input capsInput id="field-set-city" type="text" placeholder="Los Angeles" />
					</caps-field>
					<caps-field>
						<caps-field-label for="field-set-postal-code">Postal Code</caps-field-label>
						<input capsInput id="field-set-postal-code" type="text" placeholder="90502" />
					</caps-field>
				</div>
			</caps-field-group>
		</caps-field-set>
	`,
})
export class FieldSetPreview {}
