// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2078-550
// source=libs/caps/navigation-menu/src/lib/caps-navigation-menu-trigger.ts
// component=CapsNavigationMenuTrigger
import figma from 'figma';
import { icon, iconImports, type Icon } from '../../../code-connect/helpers';

const button = figma.selectedInstance;

// A button with a right icon (the chevron) opens a panel: `caps-navigation-menu-trigger`, whose
// chevron is built in, so the swapped right icon is not mapped. Without it, the button is a plain
// `capsNavigationMenuLink`. The panel content is an example to replace by `Navigation Menu Item`
// links. `State` (Hover, Focus) is a CSS state.
const label = button.getString('Label');
const icons: Icon[] = [];
let content = label;
if (button.getBoolean('Show left icon')) {
	const glyph = icon(button, '⮑ Left icon');
	icons.push(glyph);
	content = `\n\t\t${glyph.markup}\n\t\t${label}\n\t`;
}
const example = button.getBoolean('Show right icon')
	? `<li capsNavigationMenuItem>
	<button caps-navigation-menu-trigger>${content}</button>
	<ng-template capsNavigationMenuContent>
		<a capsNavigationMenuLink href="">Link</a>
	</ng-template>
</li>`
	: `<li capsNavigationMenuItem>
	<a capsNavigationMenuLink href="">${content}</a>
</li>`;

export default {
	example: figma.code`${example}`,
	imports: ["import { CapsNavigationMenuImports } from '@capsule-ng/caps/navigation-menu';", ...iconImports(icons)],
	id: 'caps-navigation-menu-button',
};
