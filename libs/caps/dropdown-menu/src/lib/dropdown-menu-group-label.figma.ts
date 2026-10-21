// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-21692
// source=libs/caps/menu/src/lib/caps-menu.ts
// component=CapsMenuLabel
import figma from 'figma';

// `Indented` has no input in code. The label has a single size, Figma Small (32px).
export default {
	example: figma.code`<caps-menu-label>${figma.selectedInstance.getString('Label')}</caps-menu-label>`,
	imports: ["import { CapsMenuImports } from '@capsule-ng/caps/menu';"],
	id: 'caps-menu-label',
};
