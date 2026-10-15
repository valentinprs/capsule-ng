// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2086-15698
// source=libs/caps/item/src/lib/caps-item-media.ts
// component=CapsItemMedia
import figma from 'figma';
import { icon, iconImports } from '../../../code-connect/helpers';

// The decorative icon placed in media slots (Item, Empty, Alert Dialog, Card). In code it is the
// icon alone: its box is drawn by the container it is projected into (`caps-item-media`,
// `caps-empty-media variant="icon"`, `caps-alert-dialog-media`). Not mapped: `Variant`, `Size` and
// `Roundness` (no equivalent in code).
const glyph = icon(figma.selectedInstance, 'Icon', ' aria-hidden="true"');

export default {
	example: figma.code`${glyph.markup}`,
	imports: iconImports([glyph]),
	id: 'caps-decorative-icon',
};
