// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-21361
// source=libs/caps/menu/src/lib/caps-menu-item.ts
// component=CapsMenuItem
import figma from 'figma';
import { icon, iconImports, type Icon } from '../../../code-connect/helpers';

const item = figma.selectedInstance;

// `Size` and `State` have no input in code; the description has no slot in `capsMenuItem`.
// Decorations are internal `.Dropdown Menu Item Left Decoration` instances: an icon, a checkbox or a
// radio on the left, a shortcut text or an icon on the right.
const label = item.getString('Label');
const type = item.getEnum('Type', { Default: '', Destructive: ' danger', Accent: ' info' }) ?? '';
const disabled = item.getEnum('Disabled', { True: ' disabled', False: '' }) ?? '';
const icons: Icon[] = [];

function decoration(layer: string, show: string): { kind: string; markup: string } | null {
	if (!item.getBoolean(show)) {
		return null;
	}
	const deco = item.findInstance(layer);
	if (deco.type !== 'INSTANCE') {
		return null;
	}
	const kind = deco.getEnum('Type', {
		Icon: 'icon',
		'Icon muted': 'icon',
		'Deco icon primary': 'icon',
		'Deco icon outline': 'icon',
		Checkbox: 'checkbox',
		Radio: 'radio',
		Text: 'text',
		'Text muted': 'text',
		Avatar: 'other',
		'Avatar placeholder': 'other',
		Swatch: 'other',
		Blank: 'other',
	});
	if (kind === 'icon') {
		const glyph = icon(deco, 'Icon');
		icons.push(glyph);
		return { kind, markup: glyph.markup };
	}
	if (kind === 'text') {
		const text = deco.findLayers((node) => node.type === 'TEXT')[0];
		return {
			kind,
			markup: `<caps-menu-shortcut>${text?.type === 'TEXT' ? text.textContent : ''}</caps-menu-shortcut>`,
		};
	}
	return { kind: kind ?? 'other', markup: '' };
}

const left = decoration('Left decoration', 'Show left decoration');
const right = decoration('Right decoration', 'Show right decoration');
const directive =
	left?.kind === 'checkbox' ? 'capsMenuCheckboxItem' : left?.kind === 'radio' ? 'capsMenuRadioItem' : 'capsMenuItem';
const children = [left?.kind === 'icon' ? left.markup : '', label, right?.markup ?? ''].filter((child) => child !== '');

export default {
	example: figma.code`<button ${directive}${type}${disabled}>${
		children.length === 1 ? label : `\n\t${children.join('\n\t')}\n`
	}</button>`,
	imports: ["import { CapsMenuImports } from '@capsule-ng/caps/menu';", ...iconImports(icons)],
	id: 'caps-menu-item',
};
