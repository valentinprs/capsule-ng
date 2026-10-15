// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2255-18110
// source=libs/caps/kbd/src/lib/caps-kbd.ts
// component=CapsKbd
import figma from 'figma';

// `Style` (Default / Alt) has no equivalent in code.
export default {
	example: figma.code`<kbd capsKbd>${figma.selectedInstance.getString('Key')}</kbd>`,
	imports: ["import { CapsKbdImports } from '@capsule-ng/caps/kbd';"],
	id: 'caps-kbd',
};
