// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2047-13471
// source=libs/caps/sidebar/src/lib/caps-sidebar-menu-badge.ts
// component=CapsSidebarMenuBadge
import figma from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', { Default: '', Primary: ' variant="primary"' });

// The badge goes in a `caps-sidebar-menu-item`, after its `capsSidebarMenuButton`.
export default {
	example: figma.code`<caps-sidebar-menu-badge${variant}>${figma.selectedInstance.getString('Count')}</caps-sidebar-menu-badge>`,
	imports: ["import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';"],
	id: 'caps-sidebar-menu-badge',
};
