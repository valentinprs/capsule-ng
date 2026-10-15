import { Component, signal } from '@angular/core';
import { CapsAccordionImports } from '@capsule-ng/caps/accordion';

@Component({
	selector: 'spartan-accordion-preview',
	imports: [CapsAccordionImports],
	host: {
		class: 'block max-w-sm',
	},
	template: `
		<caps-accordion>
			<caps-accordion-item
				title="What are your shipping options?"
				id="accordion-preview-1"
				[expanded]="_activeItem() === 'accordion-preview-1'"
				(selected)="_activeItem.set($event.expanded ? $event.id : null)"
			>
				We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on international orders.
			</caps-accordion-item>

			<caps-accordion-item
				title="What is your return policy?"
				id="accordion-preview-2"
				[expanded]="_activeItem() === 'accordion-preview-2'"
				(selected)="_activeItem.set($event.expanded ? $event.id : null)"
			>
				Returns accepted within 30 days. Items must be unused and in original packaging. Refunds processed within 5-7
				business days.
			</caps-accordion-item>

			<caps-accordion-item
				title="How can I contact customer support?"
				id="accordion-preview-3"
				[expanded]="_activeItem() === 'accordion-preview-3'"
				(selected)="_activeItem.set($event.expanded ? $event.id : null)"
			>
				Reach us via email, live chat, or phone. We respond within 24 hours during business days.
			</caps-accordion-item>
		</caps-accordion>
	`,
})
export class AccordionPreview {
	protected readonly _activeItem = signal<string | null>(null);
}

export const defaultImports = `
import { CapsAccordionImports } from '@capsule-ng/caps/accordion';
`;

export const defaultSkeleton = `
<caps-accordion>
  <caps-accordion-item title="Is it accessible?">
     Yes. It adheres to the WAI-ARIA design pattern.
  </caps-accordion-item>
</caps-accordion>
`;
