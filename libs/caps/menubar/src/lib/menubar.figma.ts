// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2047-14217
// source=libs/caps/menubar/src/lib/caps-menubar.ts
// component=CapsMenubar
import figma from 'figma';
import { lines, templateRef } from '../../../code-connect/helpers';

// One trigger per item of the slot, each opening its own empty menu template to fill. The
// references are made unique when items share a label.
const labels = (figma.selectedInstance.getSlot('Slot')?.connectedInstances ?? []).map((item) =>
	item.getString('Label'),
);
const refs = labels.map((label, index) => {
	const ref = templateRef(label);
	return labels.slice(0, index).some((other) => templateRef(other) === ref) ? `${ref}${index + 1}` : ref;
});
const triggers = lines(
	labels.map((label, index) => `<button [capsMenubarTrigger]="${refs[index]}">${label}</button>`),
	'\t',
);
const menus = refs.map((ref) => `\n\n<ng-template #${ref}>\n\t<caps-menu></caps-menu>\n</ng-template>`).join('');

export default {
	example: figma.code`<caps-menubar>${triggers}\n</caps-menubar>${menus}`,
	imports: [
		"import { CapsMenubarImports } from '@capsule-ng/caps/menubar';",
		"import { CapsMenuImports } from '@capsule-ng/caps/menu';",
	],
	id: 'caps-menubar',
};
