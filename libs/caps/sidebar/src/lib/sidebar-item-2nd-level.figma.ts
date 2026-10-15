// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2047-13613
// source=libs/caps/sidebar/src/lib/caps-sidebar-menu-sub-item.ts
// component=CapsSidebarMenuSubItem
import figma from 'figma';

const item = figma.selectedInstance;

// An item of a `caps-sidebar-menu-sub`. `State=Active` is `isActive`.
const active = item.getEnum('State', { Default: '', Active: ' isActive' }) ?? '';

export default {
	example: figma.code`<caps-sidebar-menu-sub-item>
	<a capsSidebarMenuSubButton href=""${active}>
		<span>${item.getString('Label')}</span>
	</a>
</caps-sidebar-menu-sub-item>`,
	imports: ["import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';"],
	id: 'caps-sidebar-menu-sub-item',
};
