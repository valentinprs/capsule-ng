import { Component, signal } from '@angular/core';
import { CapsAccordionImports } from '@capsule-ng/caps/accordion';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-accordion-dynamic',
	imports: [CapsAccordionImports, CapsButtonImports],
	host: {
		class: 'block max-w-sm',
	},
	template: `
		<caps-accordion>
			<caps-accordion-item
				title="What's included in my plan?"
				id="accordion--dynamic-example-1"
				[expanded]="_activeItem() === 'accordion--dynamic-example-1'"
				(selected)="_activeItem.set($event.expanded ? $event.id : null)"
			>
				<p>Your plan includes analytics, alerts, and email support.</p>
				@if (showDetails()) {
					<ul class="mt-2 list-disc pl-4">
						<li>Priority support</li>
						<li>Custom dashboards</li>
						<li>Unlimited team seats</li>
					</ul>
				}
				<button capsButton size="sm" variant="outline" class="mt-3" (click)="showDetails.set(!showDetails())">
					{{ showDetails() ? 'Hide' : 'Show' }} details
				</button>
			</caps-accordion-item>
		</caps-accordion>
	`,
})
export class AccordionDynamic {
	protected readonly _activeItem = signal<string | null>('accordion--dynamic-example-1');
	public readonly showDetails = signal(false);
}
