// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1999-15672
// source=libs/caps/empty/src/lib/caps-empty.ts
// component=CapsEmpty
import figma from 'figma';
import { lines, slotContent, type Part } from '../../../code-connect/helpers';

const empty = figma.selectedInstance;

// The variants are classes on `caps-empty`, as in the docs examples.
const variant = empty.getEnum('Variant', {
	Default: '',
	Outline: ' class="border"',
	'Outline dashed': ' class="border border-dashed"',
	Background: ' class="from-muted/50 to-background bg-gradient-to-b from-30%"',
});

const parts: Part[] = [];
if (empty.getBoolean('Show media')) {
	const media = empty.getSlot('⮑ Media')?.connectedInstances ?? [];
	// An icon gets the `icon` media style; avatars and images keep the default one.
	const isIcon = media.length > 0 && media.every((node) => node.codeConnectId()?.startsWith('lucide'));
	const content = media.map((node) => node.executeTemplate().example);
	parts.push(
		content.length === 0
			? '<caps-empty-media><!-- media --></caps-empty-media>'
			: figma.code`<caps-empty-media${isIcon ? ' variant="icon"' : ''}>${lines(content, '\t\t')}\n\t</caps-empty-media>`,
	);
}
if (empty.getBoolean('Show title')) {
	parts.push(`<caps-empty-title>${empty.getString('⮑ Title')}</caps-empty-title>`);
}
if (empty.getBoolean('Show description')) {
	parts.push(`<caps-empty-description>${empty.getString('⮑ Description')}</caps-empty-description>`);
}
if (empty.getBoolean('Show buttons')) {
	parts.push(
		figma.code`<caps-empty-actions>${lines(slotContent(empty, '⮑ Button group'), '\t\t')}\n\t</caps-empty-actions>`,
	);
}
if (empty.getBoolean('Show link')) {
	// The link is the Link Button placed after the slots, rendered by the Button template.
	const link = empty
		.findConnectedInstances((node) => node.name === 'Button')
		.find((node) => node.type === 'INSTANCE' && node.getEnum('Variant', { Link: true }) === true);
	if (link?.type === 'INSTANCE') {
		parts.push(link.executeTemplate().example);
	}
}

export default {
	example: figma.code`<caps-empty${variant}>${lines(parts, '\t')}\n</caps-empty>`,
	imports: ["import { CapsEmptyImports } from '@capsule-ng/caps/empty';"],
	id: 'caps-empty',
};
