import { Component, signal } from '@angular/core';
import { CapsAccordionImports } from '@capsule-ng/caps/accordion';

@Component({
	selector: 'spartan-accordion-borders',
	imports: [CapsAccordionImports],
	host: {
		class: 'block max-w-lg',
	},
	template: `
		<caps-accordion variant="bordered">
			@for (item of items; track $index) {
				<caps-accordion-item
					[title]="item.trigger"
					[id]="'accordion--borders-example-' + item.value"
					[expanded]="_activeItem() === 'accordion--borders-example-' + item.value"
					(selected)="_activeItem.set($event.expanded ? $event.id : null)"
				>
					{{ item.content }}
				</caps-accordion-item>
			}
		</caps-accordion>
	`,
})
export class AccordionBorders {
	protected readonly _activeItem = signal<string | null>(null);
	public items = [
		{
			value: 'billing',
			trigger: 'How does billing work?',
			content:
				'We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members.',
		},
		{
			value: 'security',
			trigger: 'Is my data secure?',
			content:
				'Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols.',
		},
		{
			value: 'integration',
			trigger: 'What integrations do you support?',
			content:
				'We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks.',
		},
	];
}
