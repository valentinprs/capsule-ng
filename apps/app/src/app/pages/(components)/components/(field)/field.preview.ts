import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
	selector: 'spartan-field-preview',
	imports: [
		CapsCheckboxImports,
		CapsTextareaImports,
		CapsButtonImports,
		CapsInputImports,
		CapsFieldImports,
		HlmSelectImports,
	],
	host: {
		class: 'w-full max-w-md',
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
							<input capsInput placeholder="John Doe" />
						</caps-field>
						<caps-field class="col-span-2">
							<caps-field-label>Card number</caps-field-label>
							<input capsInput placeholder="1234 1234 1234 1234" />
							<caps-field-description>Enter your 16-digit card number</caps-field-description>
						</caps-field>
						<div class="grid grid-cols-3 gap-4">
							<caps-field>
								<caps-field-label for="field-exp-month--trigger">Month</caps-field-label>
								<hlm-select id="field-exp-month" class="inline-block">
									<hlm-select-trigger buttonId="field-exp-month--trigger" class="w-full">
										<hlm-select-value />
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
								<caps-field-label for="field-exp-year--trigger">Year</caps-field-label>
								<hlm-select id="field-exp-year" class="inline-block">
									<hlm-select-trigger buttonId="field-exp-year--trigger" class="w-full">
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
							<caps-field>
								<caps-field-label>CVV</caps-field-label>
								<input capsInput placeholder="123" />
							</caps-field>
						</div>
					</caps-field-group>
				</caps-field-set>
				<caps-field-separator />
				<caps-field-set>
					<caps-field-legend>Billing Address</caps-field-legend>
					<caps-field-description>The billing address associated with your payment method</caps-field-description>

					<caps-field orientation="horizontal">
						<caps-checkbox [checked]="true" />
						<caps-field-label>Same as shipping address.</caps-field-label>
					</caps-field>
				</caps-field-set>

				<caps-field>
					<caps-field-label>Comments</caps-field-label>
					<textarea capsTextarea class="resize-none"></textarea>
				</caps-field>

				<div class="flex gap-2">
					<button capsButton>Submit</button>
					<button capsButton variant="outline">Cancel</button>
				</div>
			</caps-field-group>
		</form>
	`,
})
export class FieldPreview {}

export const defaultImports = `
import { CapsFieldImports } from "@capsule-ng/caps/field";
import { CapsInputImports } from "@capsule-ng/caps/input";
`;
export const defaultSkeleton = `
<caps-field-set>
    <caps-field-legend>Profile</caps-field-legend>
    <caps-field-description>This appears on invoices and emails.</caps-field-description>
    <caps-field-group>
        <caps-field>
            <caps-field-label>Full name</caps-field-label>
            <input capsInput type="text" placeholder="John Doe" />
            <caps-field-description>This appears on invoices and emails.</caps-field-description>
        </caps-field>
        <caps-field>
            <caps-field-label>Username</caps-field-label>
            <input capsInput type="text" placeholder="john_doe_99" />
        </caps-field>
    </caps-field-group>
</caps-field-set>
`;
export const anatomyCode = `
<caps-field>
    <caps-field-label>Label</caps-field-label>
    <!-- Input, Select, Switch, etc. -->
    <caps-field-description>Optional helper text.</caps-field-description>
    <caps-field-error>Validation message.</caps-field-error>
</caps-field>
`;
export const validationAndErrorCode = `
<caps-field>
  <caps-field-label>Email address</caps-field-label>
  <input capsInput type="email" [formControl]="emailControl" />
  <caps-field-description>We will never share your email.</caps-field-description>
  <caps-field-error validator="required">Email is required.</caps-field-error>
  <caps-field-error validator="email">Enter a valid email address.</caps-field-error>
</caps-field>
`;
