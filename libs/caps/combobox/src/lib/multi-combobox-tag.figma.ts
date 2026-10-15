// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-14176
// source=libs/caps/combobox/src/lib/caps-combobox-chip.ts
// component=CapsComboboxChip
import figma from 'figma';
import { slug } from '../../../code-connect/field';

// A chip of `caps-combobox-chips`, usually rendered from the selected values (see the Multi Combobox
// template). The remove button is built in. Not mapped: `State` (hover).
const label = figma.selectedInstance.getString('Label');

export default {
	example: figma.code`<caps-combobox-chip value="${slug(label)}">${label}</caps-combobox-chip>`,
	imports: ["import { CapsComboboxImports } from '@capsule-ng/caps/combobox';"],
	id: 'caps-combobox-chip',
};
