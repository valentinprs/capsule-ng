// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-21264
// source=libs/caps/dropdown-menu/src/lib/caps-dropdown-menu-trigger.ts
// component=CapsDropdownMenu
import figma from 'figma';
import { lines } from '../../../code-connect/helpers';

// The Figma component is the open menu. In code a trigger opens a `caps-menu` template, so the
// snippet shows an example trigger to replace. `Spacing` and `Style` have no equivalent in code.
// Separators inside a menu are `caps-menu-separator`, not the standalone `caps-separator`.
const items = (figma.selectedInstance.getSlot('Slot')?.connectedInstances ?? []).map((item) =>
	item.codeConnectId() === 'caps-separator' ? '<caps-menu-separator />' : item.executeTemplate().example,
);
const menu = items.length === 0 ? '\n\t\t<!-- items -->' : lines(items, '\t\t');

export default {
	example: figma.code`<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu">Open</button>

<ng-template #menu>
	<caps-menu>${menu}
	</caps-menu>
</ng-template>`,
	imports: [
		"import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';",
		"import { CapsMenuImports } from '@capsule-ng/caps/menu';",
		"import { CapsButtonImports } from '@capsule-ng/caps/button';",
	],
	id: 'caps-dropdown-menu',
};
