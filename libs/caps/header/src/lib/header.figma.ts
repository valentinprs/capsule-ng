// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=4523-38
// source=libs/caps/header/src/lib/caps-header.ts
// component=CapsHeader
import figma from 'figma';
import { indented, lines, slotContent, type Part } from '../../../code-connect/helpers';

const header = figma.selectedInstance;

// Not mapped: `Show menu button`. In code the menu button replaces the navigation below the `md`
// breakpoint through CSS, so `caps-header-menu` is always written next to `caps-header-nav`.
// The brand logo has no property: it is always shown in Figma, so the logo slot is always
// written. Capsule does not ship the logo asset; the app provides it.
const parts: Part[] = [];
const labels: string[] = [];
let navigation: Part | null = null;
if (header.getBoolean('Show navigation')) {
	const menu = header.findInstance('Navigation Menu');
	if (menu.type === 'INSTANCE') {
		navigation = menu.executeTemplate().example;
		for (const item of menu.getSlot('Slot')?.connectedInstances ?? []) {
			labels.push(item.getString('Label'));
		}
	}
}
if (navigation !== null) {
	const links =
		labels.length === 0
			? ['<!-- links -->']
			: labels.map((label) => `<a capsButton variant="ghost" href="">${label}</a>`);
	parts.push(
		`<caps-header-menu>\n\t\t<nav aria-label="Primary">\n\t\t\t${links.join('\n\t\t\t')}\n\t\t</nav>\n\t</caps-header-menu>`,
	);
}
if (header.getBoolean('Show visual ID')) {
	const visual = slotContent(header, 'Visual ID');
	parts.push(
		visual.length === 0
			? '<caps-header-visual><img src="" alt="" /></caps-header-visual>'
			: figma.code`<caps-header-visual>${lines(visual, '\t\t')}\n\t</caps-header-visual>`,
	);
}
parts.push(`<caps-header-title>${header.getString('App name')}</caps-header-title>`);
if (navigation !== null) {
	parts.push(figma.code`<caps-header-nav>\n\t\t${indented(navigation, '\t\t')}\n\t</caps-header-nav>`);
}
if (header.getBoolean('Show actions')) {
	parts.push(
		figma.code`<caps-header-actions>${lines(slotContent(header, 'Actions'), '\t\t')}\n\t</caps-header-actions>`,
	);
}
parts.push('<caps-header-logo><img src="" alt="Logo" /></caps-header-logo>');

export default {
	example: figma.code`<caps-header>${lines(parts, '\t')}\n</caps-header>`,
	imports: [
		"import { CapsHeaderImports } from '@capsule-ng/caps/header';",
		"import { CapsButtonImports } from '@capsule-ng/caps/button';",
	],
	id: 'caps-header',
};
