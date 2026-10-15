// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2047-13456
// source=libs/caps/sidebar/src/lib/caps-sidebar-menu-button.ts
// component=CapsSidebarMenuButton
import figma from 'figma';
import { icon, iconImports } from '../../../code-connect/helpers';

const item = figma.selectedInstance;

// In code a collapsed item is the same menu button as an expanded one: the sidebar
// (`collapsible="icon"`) hides the label and shows the `tooltip`. Figma has no label, so `Label`
// is a placeholder. `State=Active` is `isActive`.
const glyph = icon(item, 'Icon', ' aria-hidden="true"');
const active = item.getEnum('State', { Regular: '', Active: ' isActive' }) ?? '';

export default {
	example: figma.code`<caps-sidebar-menu-item>
	<a capsSidebarMenuButton href="" tooltip="Label"${active}>
		${glyph.markup}
		<span>Label</span>
	</a>
</caps-sidebar-menu-item>`,
	imports: ["import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';", ...iconImports([glyph])],
	id: 'caps-sidebar-menu-item-collapsed',
};
