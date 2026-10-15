// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-33181
// source=libs/caps/accordion/src/lib/caps-accordion-item.ts
// component=CapsAccordionItem
import figma from 'figma';

const trigger = figma.selectedInstance;

// The trigger is the `title` of a `caps-accordion-item`, which projects its content. `State` is a
// CSS state.
// A bordered accordion is `<caps-accordion class="rounded-lg border">` with bordered items; `Position`
// and `Show border` follow from it.
const expanded = trigger.getEnum('Open', { True: ' expanded', False: '' });
const disabled = trigger.getEnum('Disabled', { True: ' disabled', False: '' });

export default {
	example: figma.code`<caps-accordion-item title="${trigger.getString('Title')}" class="border-b px-4 last:border-b-0"${expanded}${disabled}>
	<!-- content -->
</caps-accordion-item>`,
	imports: ["import { CapsAccordionImports } from '@capsule-ng/caps/accordion';"],
	id: 'caps-accordion-item-bordered',
};
