import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCreditCard } from '@ng-icons/lucide';
import { remixAppleFill, remixPaypalFill } from '@ng-icons/remixicon';

import { CapsRadioGroupImports } from '@capsule-ng/caps/radio-group';
import { hlm } from '@spartan-ng/helm/utils';

@Component({
	selector: 'spartan-radio-card-preview',
	imports: [FormsModule, CapsRadioGroupImports, NgIcon],
	providers: [provideIcons({ lucideCreditCard, remixPaypalFill, remixAppleFill })],
	template: `
		<caps-radio-group aria-label="Payment method" class="grid grid-cols-3 gap-4" [(ngModel)]="payment">
			<caps-radio value="card" [class]="cardClass">
				<ng-icon name="lucideCreditCard" class="mb-3" />
				Card
			</caps-radio>
			<caps-radio value="paypal" [class]="cardClass">
				<ng-icon name="remixPaypalFill" class="mb-3" />
				PayPal
			</caps-radio>
			<caps-radio value="apple" [class]="cardClass">
				<ng-icon name="remixAppleFill" class="mb-3" />
				Apple
			</caps-radio>
		</caps-radio-group>
	`,
})
export class RadioGroupCard {
	public payment = 'card';

	public readonly cardClass = hlm(
		'relative block space-x-0 [&_.caps-radio-control]:flex-col [&_.caps-radio-label]:flex [&_.caps-radio-label]:flex-col [&_.caps-radio-label]:items-center',
		// base card styles
		'border-border flex flex-col items-center justify-center rounded-lg border-2 px-4 py-8',
		// hover and background styles
		'bg-background hover:bg-accent/10 cursor-pointer transition-colors',
		// spacing for the icon and text
		'[&>span]:mt-4',
		// target the checked state properly
		'[&:has([data-checked=true])]:border-primary [&:has([data-checked=true])]:border-2',
	);
}
