import { Directive, input } from '@angular/core';
import { BrnAccordionContent, BrnAccordionTrigger } from '@spartan-ng/brain/accordion';

/** @internal Override the host binding itself: native template bindings are overwritten by Brain on initialization. */
@Directive({ selector: 'button[capsAccordionTriggerBehavior]', host: { '[attr.aria-controls]': 'contentId()' } })
export class CapsAccordionTriggerBehavior extends BrnAccordionTrigger {
	public readonly contentId = input.required<string>();
}

/** @internal Keep Brain's measured/inert region and trigger label with the public Carbon panel ID. */
@Directive({ selector: '[capsAccordionContentBehavior]', host: { '[id]': 'contentId()' } })
export class CapsAccordionContentBehavior extends BrnAccordionContent {
	public readonly contentId = input.required<string>();
}
