import { Component } from '@angular/core';
import { CapsAccordionImports } from '@capsule-ng/caps/accordion';

@Component({
	selector: 'spartan-accordion-multiple',
	imports: [CapsAccordionImports],
	host: {
		class: 'max-w-sm  block',
	},
	template: `
		<caps-accordion>
			@for (item of items; track item.value; let i = $index) {
				<caps-accordion-item [expanded]="i === 0" [title]="item.trigger">
					{{ item.content }}
				</caps-accordion-item>
			}
		</caps-accordion>
	`,
})
export class AccordionMultiple {
	public items = [
		{
			value: 'notifications',
			trigger: 'Notification Settings',
			content:
				'Manage how you receive notifications. You can enable email alerts for updates or push notifications for mobile devices.',
		},
		{
			value: 'privacy',
			trigger: 'Privacy & Security',
			content:
				'Control your privacy settings and security preferences. Enable two-factor authentication, manage connected devices, review active sessions, and configure data sharing preferences. You can also download your data or delete your account.',
		},
		{
			value: 'billing',
			trigger: 'Billing & Subscription',
			content:
				'View your current plan, payment history, and upcoming invoices. Update your payment method, change your subscription tier, or cancel your subscription.',
		},
	];
}
