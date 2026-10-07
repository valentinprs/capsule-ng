import { Component, signal } from '@angular/core';
import { CapsAccordionImports } from '@capsule-ng/caps/accordion';
import { CapsCardImports } from '@capsule-ng/caps/card';

@Component({
	selector: 'spartan-accordion-card',
	imports: [CapsAccordionImports, CapsCardImports],
	host: {
		class: 'block max-w-lg',
	},
	template: `
		<caps-card maxWidth="sm">
			<caps-card-header>
				<caps-card-title [level]="3">Subscription & Billing</caps-card-title>
				<caps-card-description>
					Common questions about your account, plans, payments and cancellations.
				</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<caps-accordion>
					@for (item of items; track $index) {
						<caps-accordion-item
							[title]="item.trigger"
							[id]="'accordion--card-example-' + item.value"
							[expanded]="_activeItem() === 'accordion--card-example-' + item.value"
							(selected)="_activeItem.set($event.expanded ? $event.id : null)"
						>
							{{ item.content }}
						</caps-accordion-item>
					}
				</caps-accordion>
			</caps-card-content>
		</caps-card>
	`,
})
export class AccordionCard {
	protected readonly _activeItem = signal<string | null>(null);
	public items = [
		{
			value: 'plans',
			trigger: 'What subscription plans do you offer?',
			content:
				'We offer three subscription tiers: Starter ($9/month), Professional ($29/month), and Enterprise ($99/month). Each plan includes increasing storage limits, API access, priority support, and team collaboration features.',
		},
		{
			value: 'billing',
			trigger: 'How does billing work?',
			content:
				"Billing occurs automatically at the start of each billing cycle. We accept all major credit cards, PayPal, and ACH transfers for enterprise customers. You'll receive an invoice via email after each payment.",
		},
		{
			value: 'cancel',
			trigger: 'How do I cancel my subscription?',
			content:
				'You can cancel your subscription anytime from your account settings. There are no cancellation fees or penalties. Your access will continue until the end of your current billing period.',
		},
	];
}
