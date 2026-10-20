// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=4523-38
// source=libs/caps/header/src/lib/caps-header.ts
// component=CapsHeader
import figma from 'figma';
import { indented, lines, slotContent, type Part } from '../../../code-connect/helpers';

const header = figma.selectedInstance;

// Not mapped: `Show menu button`. In code, `caps-header` shows the menu button itself below the
// `md` breakpoint whenever a `*capsHeaderNav` navigation is present, and renders that same
// navigation in its sheet. The nested Navigation Menu snippet cannot take the structural
// directive, so it is wrapped in an `ng-container`.
// The brand logo has no property: it is always shown in Figma, so the logo slot is always
// written. Capsule does not ship the logo asset; the app provides it.
const slot = (name: string) => slotContent(header, name).map((part) => indented(part, '\t\t'));
const parts: Part[] = [];
if (header.getBoolean('Show visual ID')) {
	const visual = slot('Visual ID');
	parts.push(
		visual.length === 0
			? '<caps-header-visual><img src="" alt="" /></caps-header-visual>'
			: figma.code`<caps-header-visual>${lines(visual, '\t\t')}\n\t</caps-header-visual>`,
	);
}
parts.push(`<caps-header-title>${header.getString('App name')}</caps-header-title>`);
if (header.getBoolean('Show navigation')) {
	const menu = header.findInstance('Navigation Menu');
	if (menu.type === 'INSTANCE') {
		const navigation = indented(menu.executeTemplate().example, '\t\t');
		parts.push(figma.code`<ng-container *capsHeaderNav>\n\t\t${navigation}\n\t</ng-container>`);
	}
}
if (header.getBoolean('Show actions')) {
	parts.push(figma.code`<caps-header-actions>${lines(slot('Actions'), '\t\t')}\n\t</caps-header-actions>`);
}
parts.push('<caps-header-logo><img src="" alt="Logo" /></caps-header-logo>');

export default {
	example: figma.code`<caps-header>${lines(parts, '\t')}\n</caps-header>`,
	imports: ["import { CapsHeaderImports } from '@capsule-ng/caps/header';"],
	id: 'caps-header',
};
