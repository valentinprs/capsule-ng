// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-27107
// source=libs/caps/card/src/lib/caps-card.ts
// component=CapsCard
import figma from 'figma';

const card = figma.selectedInstance;

// Each section is a `.Card Section` instance holding a free slot. Its `Background` and
// `Show border` match the default look of `caps-card-header|content|footer`, so they are not
// mapped. `Spacing` is set per section in Figma but on the whole card in code: Small on the
// body becomes `density="compact"`.
type Section = { layer: string; show: string; tag: string };
const header: Section = { layer: 'Header', show: 'Show header', tag: 'caps-card-header' };
const body: Section = { layer: 'Body', show: 'Show content', tag: 'caps-card-content' };
const footer: Section = { layer: 'Footer', show: 'Show footer', tag: 'caps-card-footer' };

// `Slot count=1` only has the body, without a visibility toggle.
const slotCount = card.getEnum('Slot count', { '1': 1, '2': 2, '3': 3 }) ?? 1;
const sections = slotCount === 1 ? [body] : slotCount === 2 ? [header, body] : [header, body, footer];

let density = '';
let markup = figma.code``;
for (const { layer, show, tag } of sections) {
	const section = card.findInstance(layer);
	if (section.type !== 'INSTANCE' || (slotCount > 1 && !card.getBoolean(show))) {
		continue;
	}
	if (layer === 'Body') {
		density = section.getEnum('Spacing', { Default: '', Small: ' density="compact"', None: '' }) ?? '';
	}
	// Connected instances of the slot are rendered by their own templates.
	const items = section.getSlot('Slot')?.connectedInstances ?? [];
	const content =
		items.length === 0
			? figma.code`\n\t\t<!-- ${layer.toLowerCase()} content -->`
			: items.reduce((code, item) => figma.code`${code}\n\t\t${item.executeTemplate().example}`, figma.code``);
	markup = figma.code`${markup}\n\t<${tag}>${content}\n\t</${tag}>`;
}

export default {
	example: figma.code`<caps-card${density}>${markup}\n</caps-card>`,
	imports: ["import { CapsCardImports } from '@capsule-ng/caps/card';"],
	id: 'caps-card',
};
