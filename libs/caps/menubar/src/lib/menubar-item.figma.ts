// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2047-14210
// source=libs/caps/menubar/src/lib/caps-menubar.ts
// component=CapsMenubarTrigger
import figma from 'figma';
import { templateRef } from '../../../code-connect/helpers';

// Each item opens its own `caps-menu` template. `State=Active` is the open item.
const label = figma.selectedInstance.getString('Label');

export default {
	example: figma.code`<button [capsMenubarTrigger]="${templateRef(label)}">${label}</button>`,
	imports: ["import { CapsMenubarImports } from '@capsule-ng/caps/menubar';"],
	id: 'caps-menubar-trigger',
};
