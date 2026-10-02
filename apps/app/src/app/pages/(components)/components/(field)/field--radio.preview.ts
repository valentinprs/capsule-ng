import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';

@Component({
	selector: 'spartan-field-radio-preview',
	imports: [CapsFieldImports, HlmRadioGroupImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field-set>
			<caps-field-legend variant="label">Subscription Plan</caps-field-legend>
			<caps-field-description>Yearly and lifetime plans offer significant savings.</caps-field-description>
			<hlm-radio-group value="monthly">
				<caps-field orientation="horizontal">
					<hlm-radio value="monthly" inputId="plan-monthly">
						<hlm-radio-indicator indicator />
					</hlm-radio>
					<caps-field-label for="plan-monthly" class="font-normal">Monthly ($9.99/month)</caps-field-label>
				</caps-field>
				<caps-field orientation="horizontal">
					<hlm-radio value="yearly" inputId="plan-yearly">
						<hlm-radio-indicator indicator />
					</hlm-radio>
					<caps-field-label for="plan-yearly" class="font-normal">Yearly ($99.99/year)</caps-field-label>
				</caps-field>
				<caps-field orientation="horizontal">
					<hlm-radio value="lifetime" inputId="plan-lifetime">
						<hlm-radio-indicator indicator />
					</hlm-radio>
					<caps-field-label for="plan-lifetime" class="font-normal">Lifetime ($299.99/lifetime)</caps-field-label>
				</caps-field>
			</hlm-radio-group>
		</caps-field-set>
	`,
})
export class FieldRadioPreview {}
