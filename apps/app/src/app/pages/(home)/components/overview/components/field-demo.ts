import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CapsButton } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInput } from '@capsule-ng/caps/input';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { CapsTextarea } from '@capsule-ng/caps/textarea';
import { HlmCheckbox } from '@spartan-ng/helm/checkbox';
@Component({
	selector: 'spartan-field-demo',
	imports: [CapsFieldImports, CapsSelectImports, CapsInput, CapsTextarea, CapsButton, HlmCheckbox],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full max-w-md rounded-lg border p-6 h-full',
	},
	template: `
		<form>
			<caps-field-group>
				<caps-field-set>
					<caps-field-legend>Payment Method</caps-field-legend>
					<caps-field-description>All transactions are secure and encrypted</caps-field-description>
					<caps-field-group>
						<caps-field>
							<caps-field-label>Name on card</caps-field-label>
							<input capsInput placeholder="John Doe" id="field-preview-name-on-card" />
						</caps-field>
						<div class="grid grid-cols-3 gap-4">
							<caps-field class="col-span-2">
								<caps-field-label>Card number</caps-field-label>
								<input capsInput placeholder="1234 1234 1234 1234" id="field-preview-card-number" />
								<caps-field-description>Enter your 16-digit card number.</caps-field-description>
							</caps-field>
							<caps-field>
								<caps-field-label>CVV</caps-field-label>
								<input capsInput placeholder="123" id="field-preview-cvv" />
							</caps-field>
						</div>
						<div class="grid grid-cols-2 gap-4">
							<caps-field>
								<caps-field-label>Month</caps-field-label>
								<caps-select placeholder="MM" id="field-exp-month" class="inline-block w-full">
									<caps-select-option value="01">01</caps-select-option>
									<caps-select-option value="02">02</caps-select-option>
									<caps-select-option value="03">03</caps-select-option>
									<caps-select-option value="04">04</caps-select-option>
									<caps-select-option value="05">05</caps-select-option>
									<caps-select-option value="06">06</caps-select-option>
									<caps-select-option value="07">07</caps-select-option>
									<caps-select-option value="08">08</caps-select-option>
									<caps-select-option value="09">09</caps-select-option>
									<caps-select-option value="10">10</caps-select-option>
									<caps-select-option value="11">11</caps-select-option>
									<caps-select-option value="12">12</caps-select-option>
								</caps-select>
							</caps-field>
							<caps-field>
								<caps-field-label>Year</caps-field-label>
								<caps-select placeholder="YYYY" id="field-exp-year" class="inline-block w-full">
									<caps-select-option value="2024">2024</caps-select-option>
									<caps-select-option value="2025">2025</caps-select-option>
									<caps-select-option value="2026">2026</caps-select-option>
									<caps-select-option value="2027">2027</caps-select-option>
									<caps-select-option value="2028">2028</caps-select-option>
									<caps-select-option value="2029">2029</caps-select-option>
								</caps-select>
							</caps-field>
						</div>
					</caps-field-group>
				</caps-field-set>
				<caps-field-separator />
				<caps-field-set>
					<caps-field-legend>Billing Address</caps-field-legend>
					<caps-field-description>The billing address associated with your payment method</caps-field-description>
					<caps-field-group>
						<caps-field orientation="horizontal">
							<hlm-checkbox inputId="field-preview-billing-address" [checked]="true" />
							<caps-field-label>Same as shipping address.</caps-field-label>
						</caps-field>
					</caps-field-group>
				</caps-field-set>
				<caps-field-set>
					<caps-field-group>
						<caps-field>
							<caps-field-label>Comments</caps-field-label>
							<textarea capsTextarea id="field-preview-comments"></textarea>
						</caps-field>
					</caps-field-group>
				</caps-field-set>
				<div class="flex items-center gap-2">
					<button capsButton>Submit</button>
					<button capsButton variant="outline">Cancel</button>
				</div>
			</caps-field-group>
		</form>
	`,
})
export class FieldDemo {}
