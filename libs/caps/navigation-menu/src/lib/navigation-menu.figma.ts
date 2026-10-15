// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2078-525
// source=libs/caps/navigation-menu/src/lib/caps-navigation-menu.ts
// component=CapsNavigationMenu
import figma from 'figma';
import { indented, lines, slotContent } from '../../../code-connect/helpers';

// The buttons of the slot are rendered by their own template, each one as a `li[capsNavigationMenuItem]`.
const items = slotContent(figma.selectedInstance, 'Slot').map((item) => indented(item, '\t'));
const body = items.length === 0 ? '\n\t<!-- items -->' : lines(items, '\t');

export default {
	example: figma.code`<caps-navigation-menu aria-label="">${body}
</caps-navigation-menu>`,
	imports: ["import { CapsNavigationMenuImports } from '@capsule-ng/caps/navigation-menu';"],
	id: 'caps-navigation-menu',
};
