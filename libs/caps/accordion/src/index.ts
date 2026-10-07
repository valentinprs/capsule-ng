import { CapsAccordion } from './lib/caps-accordion';
import { CapsAccordionItem } from './lib/caps-accordion-item';
export * from './lib/caps-accordion';
export * from './lib/caps-accordion-item';
/** @internal Angular packaging must resolve the root's host-directive metadata. */
export { CapsAccordionBehavior as ɵCapsAccordionBehavior } from './lib/caps-accordion-behavior';
export const CapsAccordionImports = [CapsAccordion, CapsAccordionItem] as const;
