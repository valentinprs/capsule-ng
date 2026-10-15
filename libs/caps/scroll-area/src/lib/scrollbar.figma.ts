// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-14936
// source=libs/caps/scroll-area/src/lib/caps-scroll-area.ts
// component=CapsScrollArea
import figma from 'figma';

// The Figma component is the scrollbar; in code it belongs to the `caps-scroll-area` that scrolls.
const orientation = figma.selectedInstance.getEnum('Type', { Vertical: 'vertical', Horizontal: 'horizontal' });

export default {
	example: figma.code`<caps-scroll-area orientation="${orientation}" aria-label="">
	<!-- content -->
</caps-scroll-area>`,
	imports: ["import { CapsScrollAreaImports } from '@capsule-ng/caps/scroll-area';"],
	id: 'caps-scroll-area',
};
