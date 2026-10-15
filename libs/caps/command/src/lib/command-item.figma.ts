// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1999-15083
// source=libs/caps/command/src/lib/caps-command-item.ts
// component=CapsCommandItem
import figma from 'figma';
import { disabled, element, icon, iconImports, type Icon } from '../../../code-connect/helpers';

const item = figma.selectedInstance;

// `State` (Hover, Active = keyboard highlight) is a CSS state; the description has no slot in
// `capsCommandItem`. The right decoration is a `.Dropdown Menu Item Right Decoration` instance: a
// text becomes a `caps-command-shortcut`, an icon an `<ng-icon>`.
const label = item.getString('Label');
const icons: Icon[] = [];
let left: string | null = null;
if (item.getBoolean('Show icon')) {
	const glyph = icon(item, '⮑ Icon');
	icons.push(glyph);
	left = glyph.markup;
}

function rightDecoration(): string | null {
	if (!item.getBoolean('Show right decoration')) {
		return null;
	}
	const deco = item.findInstance('Right decoration');
	if (deco.type !== 'INSTANCE') {
		return null;
	}
	const kind = deco.getEnum('Type', {
		Icon: 'icon',
		'Icon muted': 'icon',
		'Deco icon primary': 'icon',
		'Deco icon outline': 'icon',
		Text: 'text',
		'Text muted': 'text',
	});
	if (kind === 'icon') {
		const glyph = icon(deco, 'Icon');
		icons.push(glyph);
		return glyph.markup;
	}
	if (kind === 'text') {
		const text = deco.findLayers((node) => node.type === 'TEXT')[0];
		return `<caps-command-shortcut>${text?.type === 'TEXT' ? text.textContent : ''}</caps-command-shortcut>`;
	}
	return null;
}

const right = rightDecoration();
const open = `<button capsCommandItem value="${label}"${item.getEnum('Disabled', disabled) ?? ''}>`;
const example =
	left === null && right === null ? `${open}${label}</button>` : element(open, [left, label, right], '</button>');

export default {
	example: figma.code`${example}`,
	imports: ["import { CapsCommandImports } from '@capsule-ng/caps/command';", ...iconImports(icons)],
	id: 'caps-command-item',
};
