import { Component, signal } from '@angular/core';
import { CapsAccordionImports } from '@capsule-ng/caps/accordion';

@Component({
	selector: 'spartan-accordion-disabled',
	imports: [CapsAccordionImports],
	host: {
		class: 'block max-w-sm',
	},
	template: `
		<caps-accordion>
			<caps-accordion-item
				title="Can I access my account history?"
				id="accordion--disabled-example-1"
				[expanded]="_activeItem() === 'accordion--disabled-example-1'"
				(selected)="_activeItem.set($event.expanded ? $event.id : null)"
			>
				Yes, you can view your complete account history including all transactions, plan changes, and support tickets in
				the Account History section of your dashboard.
			</caps-accordion-item>
			<caps-accordion-item
				disabled
				title="Premium feature information"
				id="accordion--disabled-example-2"
				[expanded]="_activeItem() === 'accordion--disabled-example-2'"
				(selected)="_activeItem.set($event.expanded ? $event.id : null)"
			>
				This section contains information about premium features. Upgrade your plan to access this content.
			</caps-accordion-item>
			<caps-accordion-item
				title="How do I update my email address?"
				id="accordion--disabled-example-3"
				[expanded]="_activeItem() === 'accordion--disabled-example-3'"
				(selected)="_activeItem.set($event.expanded ? $event.id : null)"
			>
				You can update your email address in your account settings. You'll receive a verification email at your new
				address to confirm the change.
			</caps-accordion-item>
		</caps-accordion>
	`,
})
export class AccordionDisabled {
	protected readonly _activeItem = signal<string | null>(null);
}
