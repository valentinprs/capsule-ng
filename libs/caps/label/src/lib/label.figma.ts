// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-18500
// source=libs/caps/label/src/lib/caps-label.ts
// component=CapsLabel
import figma from 'figma';

// `Layout`, `Weight` and `State` have no input in code: the label inherits them from its field.
export default {
	example: figma.code`<label capsLabel for="">${figma.selectedInstance.getString('Label')}</label>`,
	imports: ["import { CapsLabelImports } from '@capsule-ng/caps/label';"],
	id: 'caps-label',
};
