import { Directive, input } from '@angular/core';
import { BrnAccordion, provideBrnAccordion } from '@spartan-ng/brain/accordion';

/** @internal Carbon items expand independently; the root does not expose Brain's mode inputs. */
@Directive({
	selector: '[capsAccordionBehavior]',
	providers: [provideBrnAccordion(CapsAccordionBehavior)],
})
export class CapsAccordionBehavior extends BrnAccordion {
	public override readonly type = input<'single' | 'multiple'>('multiple');
}
