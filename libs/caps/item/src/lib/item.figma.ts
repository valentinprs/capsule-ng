// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1999-10197
// source=libs/caps/item/src/lib/caps-item.ts
// component=CapsItem
import figma from 'figma';
import { lines, slotContent, type Part } from '../../../code-connect/helpers';

const item = figma.selectedInstance;

// Not mapped: `Variant` (Outline / Muted) and `Size` have no input on `caps-item` (the size is set by
// `caps-item-group`), and `Interaction` is the hover state of a link item.
function section(slot: string, tag: string, fallback: string): Part {
	const content = slotContent(item, slot);
	return content.length === 0
		? `<${tag}><!-- ${fallback} --></${tag}>`
		: figma.code`<${tag}>${lines(content, '\t\t')}\n\t</${tag}>`;
}

const parts: Part[] = [];
if (item.getBoolean('Show left slot')) {
	parts.push(section('⮑ Left slot content', 'caps-item-media', 'media'));
}
parts.push(`<caps-item-content>
		<caps-item-title>${item.getString('Title')}</caps-item-title>
		<caps-item-description>${item.getString('Description')}</caps-item-description>
	</caps-item-content>`);
if (item.getBoolean('Show right slot')) {
	parts.push(section('⮑ Right slot content', 'caps-item-actions', 'actions'));
}

export default {
	example: figma.code`<caps-item>${lines(parts, '\t')}\n</caps-item>`,
	imports: ["import { CapsItemImports } from '@capsule-ng/caps/item';"],
	id: 'caps-item',
};
