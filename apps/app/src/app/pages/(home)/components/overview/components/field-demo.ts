import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CapsButton } from '@capsule-ng/caps/button';
import { CapsCheckbox } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInput } from '@capsule-ng/caps/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmTextarea } from '@spartan-ng/helm/textarea';

@Component({
	selector: 'spartan-field-demo',
	imports: [CapsFieldImports, HlmSelectImports, CapsInput, HlmTextarea, CapsButton, CapsCheckbox],
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
							<caps-field-label for="field-preview-name-on-card">Name on card</caps-field-label>
							<input capsInput placeholder="John Doe" id="field-preview-name-on-card" />
						</caps-field>
						<div class="grid grid-cols-3 gap-4">
							<caps-field class="col-span-2">
								<caps-field-label for="field-preview-card-number">Card number</caps-field-label>
								<input capsInput placeholder="1234 1234 1234 1234" id="field-preview-card-number" />
								<caps-field-description>Enter your 16-digit card number.</caps-field-description>
							</caps-field>
							<caps-field>
								<caps-field-label for="field-preview-cvv">CVV</caps-field-label>
								<input capsInput placeholder="123" id="field-preview-cvv" />
							</caps-field>
						</div>
						<div class="grid grid-cols-2 gap-4">
							<caps-field>
								<caps-field-label for="field-exp-month">Month</caps-field-label>
								<hlm-select class="inline-block">
									<hlm-select-trigger class="w-full" buttonId="field-exp-month">
										<hlm-select-value placeholder="MM" />
									</hlm-select-trigger>
									<hlm-select-content *hlmSelectPortal>
										<hlm-select-group>
											<hlm-select-item value="01">01</hlm-select-item>
											<hlm-select-item value="02">02</hlm-select-item>
											<hlm-select-item value="03">03</hlm-select-item>
											<hlm-select-item value="04">04</hlm-select-item>
											<hlm-select-item value="05">05</hlm-select-item>
											<hlm-select-item value="06">06</hlm-select-item>
											<hlm-select-item value="07">07</hlm-select-item>
											<hlm-select-item value="08">08</hlm-select-item>
											<hlm-select-item value="09">09</hlm-select-item>
											<hlm-select-item value="10">10</hlm-select-item>
											<hlm-select-item value="11">11</hlm-select-item>
											<hlm-select-item value="12">12</hlm-select-item>
										</hlm-select-group>
									</hlm-select-content>
								</hlm-select>
							</caps-field>
							<caps-field>
								<caps-field-label for="field-exp-year">Year</caps-field-label>
								<hlm-select class="inline-block">
									<hlm-select-trigger class="w-full" buttonId="field-exp-year">
										<hlm-select-value placeholder="YYYY" />
									</hlm-select-trigger>
									<hlm-select-content *hlmSelectPortal>
										<hlm-select-group>
											<hlm-select-item value="2024">2024</hlm-select-item>
											<hlm-select-item value="2025">2025</hlm-select-item>
											<hlm-select-item value="2026">2026</hlm-select-item>
											<hlm-select-item value="2027">2027</hlm-select-item>
											<hlm-select-item value="2028">2028</hlm-select-item>
											<hlm-select-item value="2029">2029</hlm-select-item>
										</hlm-select-group>
									</hlm-select-content>
								</hlm-select>
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
							<caps-checkbox id="field-preview-billing-address" [checked]="true" />
							<caps-field-label for="field-preview-billing-address">Same as shipping address.</caps-field-label>
						</caps-field>
					</caps-field-group>
				</caps-field-set>
				<caps-field-set>
					<caps-field-group>
						<caps-field>
							<caps-field-label for="field-preview-comments">Comments</caps-field-label>
							<textarea hlmTextarea id="field-preview-comments"></textarea>
						</caps-field>
					</caps-field-group>
				</caps-field-set>
				<caps-field orientation="horizontal">
					<button capsButton>Submit</button>
					<button capsButton variant="outline">Cancel</button>
				</caps-field>
			</caps-field-group>
		</form>
	`,
})
export class FieldDemo {}
