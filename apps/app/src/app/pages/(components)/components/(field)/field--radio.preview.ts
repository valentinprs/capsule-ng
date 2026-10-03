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
		<caps-field-set>
			<caps-field-legend variant="label">Subscription Plan</caps-field-legend>
			<caps-field-description>Yearly and lifetime plans offer significant savings.</caps-field-description>
			<caps-radio-group value="monthly">
				<caps-field orientation="horizontal">
					<caps-radio value="monthly" id="plan-monthly"></caps-radio>
					<caps-field-label for="plan-monthly" class="font-normal">Monthly ($9.99/month)</caps-field-label>
				</caps-field>
				<caps-field orientation="horizontal">
					<caps-radio value="yearly" id="plan-yearly"></caps-radio>
					<caps-field-label for="plan-yearly" class="font-normal">Yearly ($99.99/year)</caps-field-label>
				</caps-field>
				<caps-field orientation="horizontal">
					<caps-radio value="lifetime" id="plan-lifetime"></caps-radio>
					<caps-field-label for="plan-lifetime" class="font-normal">Lifetime ($299.99/lifetime)</caps-field-label>
				</caps-field>
			</caps-radio-group>
		</caps-field-set>
	`,
})
export class FieldRadioPreview {}
