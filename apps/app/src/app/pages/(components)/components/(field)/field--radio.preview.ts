import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';

@Component({
	selector: 'spartan-field-radio-preview',
	imports: [CapsFieldImports, CapsRadioGroupImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field>
			<caps-field-label>Subscription Plan</caps-field-label>
			<caps-field-description>Yearly and lifetime plans offer significant savings.</caps-field-description>
			<caps-radio-group value="monthly">
				<caps-radio value="monthly">Monthly ($9.99/month)</caps-radio>
				<caps-radio value="yearly">Yearly ($99.99/year)</caps-radio>
				<caps-radio value="lifetime">Lifetime ($299.99/lifetime)</caps-radio>
			</caps-radio-group>
		</caps-field>
	`,
})
export class FieldRadioPreview {}
