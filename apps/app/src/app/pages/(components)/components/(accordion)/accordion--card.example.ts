import { Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';

@Component({
	selector: 'spartan-accordion-card',
	imports: [HlmAccordionImports, CapsCardImports],
	host: {
		class: 'max-w-lg h-[32rem] md:h-[28rem] flex flex-col justify-between',
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
				<hlm-accordion>
					@for (item of items; track $index) {
						<hlm-accordion-item>
							<hlm-accordion-trigger>
								{{ item.trigger }}
							</hlm-accordion-trigger>
							<hlm-accordion-content>
								{{ item.content }}
							</hlm-accordion-content>
						</hlm-accordion-item>
					}
				</hlm-accordion>
			</caps-card-content>
		</caps-card>
	`,
})
export class AccordionCard {
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
