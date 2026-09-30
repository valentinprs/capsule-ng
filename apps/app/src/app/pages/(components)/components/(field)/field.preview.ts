import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
	selector: 'spartan-field-preview',
	imports: [
		HlmCheckboxImports,
		CapsTextareaImports,
		HlmButtonImports,
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
				<fieldset capsFieldSet>
					<legend capsFieldLegend>Payment Method</legend>
					<caps-field-description>All transactions are secure and encrypted</caps-field-description>

					<caps-field-group>
						<caps-field>
							<label capsLabel for="field-preview-name-on-card">Name on card</label>
							<input capsInput placeholder="John Doe" id="field-preview-name-on-card" />
						</caps-field>
						<caps-field class="col-span-2">
							<label capsLabel for="field-preview-card-number">Card number</label>
							<input capsInput placeholder="1234 1234 1234 1234" id="field-preview-card-number" />
							<caps-field-description>Enter your 16-digit card number</caps-field-description>
						</caps-field>
						<div class="grid grid-cols-3 gap-4">
							<caps-field>
								<label capsLabel for="field-exp-month--trigger">Month</label>
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
								<label capsLabel for="field-exp-year--trigger">Year</label>
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
								<label capsLabel for="field-preview-cvv">CVV</label>
								<input capsInput placeholder="123" id="field-preview-cvv" />
							</caps-field>
						</div>
					</caps-field-group>
				</fieldset>
				<caps-field-separator />
				<fieldset capsFieldSet>
					<legend capsFieldLegend>Billing Address</legend>
					<caps-field-description>The billing address associated with your payment method</caps-field-description>
					<caps-field-group>
						<caps-field orientation="horizontal">
							<hlm-checkbox inputId="field-preview-billing-address" [checked]="true" />
							<label capsLabel for="field-preview-billing-address">Same as shipping address.</label>
						</caps-field>
					</caps-field-group>
				</fieldset>
				<fieldset capsFieldSet>
					<caps-field-group>
						<caps-field>
							<label capsLabel for="field-preview-comments">Comments</label>
							<textarea capsTextarea class="resize-none" id="field-preview-comments"></textarea>
						</caps-field>
					</caps-field-group>
				</fieldset>
				<caps-field orientation="horizontal">
					<button hlmBtn>Submit</button>
					<button hlmBtn variant="outline">Cancel</button>
				</caps-field>
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
<fieldset capsFieldSet>
    <legend capsFieldLegend>Profile</legend>
    <caps-field-description>This appears on invoices and emails.</caps-field-description>
    <caps-field-group>
        <caps-field>
            <label capsLabel for="field-preview-fullname">Full name</label>
            <input capsInput id="field-preview-fullname" type="text" placeholder="John Doe" />
            <caps-field-description>This appears on invoices and emails.</caps-field-description>
        </caps-field>
        <caps-field>
            <label capsLabel for="field-preview-username">Username</label>
            <input capsInput id="field-preview-username" type="text" placeholder="john_doe_99" />
        </caps-field>
    </caps-field-group>
</fieldset>
`;
export const anatomyCode = `
<caps-field>
    <label capsLabel for="field-preview-fullname">Label</label>
    <!-- Input, Select, Switch, etc. -->
    <caps-field-description>Optional helper text.</caps-field-description>
    <caps-field-error>Validation message.</caps-field-error>
</caps-field>
`;
export const validationAndErrorCode = `
<caps-field>
  <label capsLabel>Email address</label>
  <input capsInput type="email" [formControl]="emailControl" />
  <caps-field-description>We will never share your email.</caps-field-description>
  <caps-field-error validator="required">Email is required.</caps-field-error>
  <caps-field-error validator="email">Enter a valid email address.</caps-field-error>
</caps-field>
`;
