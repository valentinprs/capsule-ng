// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-33255
// source=libs/caps/accordion/src/lib/caps-accordion-item.ts
// component=CapsAccordionItem
import figma from 'figma';

// The content is projected into the `caps-accordion-item` of its trigger. `Type=End` is the last
// item of a `variant="bordered"` accordion.
const content = figma.selectedInstance.findText('This is the content shown when opening an accordion.');

export default {
	example: figma.code`${content.type === 'TEXT' ? content.textContent : ''}`,
	imports: ["import { CapsAccordionImports } from '@capsule-ng/caps/accordion';"],
	id: 'caps-accordion-content',
};
