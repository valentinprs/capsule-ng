// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2078-589
// source=libs/caps/navigation-menu/src/lib/caps-navigation-menu-link.ts
// component=CapsNavigationMenuLink
import figma from 'figma';
import { element, icon, iconImports, type Icon } from '../../../code-connect/helpers';

const item = figma.selectedInstance;

// A link of a navigation menu panel (`ng-template[capsNavigationMenuContent]`). The title and
// description layout is the one of the docs examples. `State` (Hover, Focus) is a CSS state.
const label = item.getString('Label');
const icons: Icon[] = [];
let glyph: string | null = null;
if (item.getBoolean('Show left icon')) {
	const resolved = icon(item, '⮑ Left icon');
	icons.push(resolved);
	glyph = resolved.markup;
}
const text = item.getBoolean('Show description')
	? `<div class="flex flex-col gap-1 text-sm">
		<div class="leading-none font-medium">${label}</div>
		<div class="text-muted-foreground line-clamp-2">${item.getString('⮑ Description')}</div>
	</div>`
	: label;
const open = '<a capsNavigationMenuLink href="">';
const example = glyph === null && text === label ? `${open}${label}</a>` : element(open, [glyph, text], '</a>');

export default {
	example: figma.code`${example}`,
	imports: ["import { CapsNavigationMenuImports } from '@capsule-ng/caps/navigation-menu';", ...iconImports(icons)],
	id: 'caps-navigation-menu-item',
};
