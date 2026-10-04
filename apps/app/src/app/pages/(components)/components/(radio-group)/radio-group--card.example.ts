import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCreditCard } from '@ng-icons/lucide';
import { remixAppleFill, remixPaypalFill } from '@ng-icons/remixicon';

@Component({
	selector: 'spartan-radio-card-preview',
	imports: [FormsModule, CapsFieldImports, CapsRadioGroupImports, NgIcon],
	providers: [provideIcons({ lucideCreditCard, remixPaypalFill, remixAppleFill })],
	template: `
		<caps-radio-group aria-label="Payment method" class="grid grid-cols-3 gap-4" [(ngModel)]="payment">
			<caps-field-label for="payment-card" [class]="cardClass">
				<caps-radio value="card" id="payment-card" />
				<ng-icon name="lucideCreditCard" class="mb-3" />
				<span>Card</span>
			</caps-field-label>
			<caps-field-label for="payment-paypal" [class]="cardClass">
				<caps-radio value="paypal" id="payment-paypal" />
				<ng-icon name="remixPaypalFill" class="mb-3" />
				<span>PayPal</span>
			</caps-field-label>
			<caps-field-label for="payment-apple" [class]="cardClass">
				<caps-radio value="apple" id="payment-apple" />
				<ng-icon name="remixAppleFill" class="mb-3" />
				<span>Apple</span>
			</caps-field-label>
		</caps-radio-group>
	`,
})
export class RadioGroupCard {
	public payment = 'card';
	public readonly cardClass =
		'border-border bg-background hover:bg-accent/10 relative flex h-full cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 px-4 py-8 transition-colors has-[[data-checked=true]]:border-primary';
}
