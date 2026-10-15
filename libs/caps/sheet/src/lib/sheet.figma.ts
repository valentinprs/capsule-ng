// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-14738
// source=libs/caps/sheet/src/lib/caps-sheet.ts
// component=CapsSheet
import figma from 'figma';
import { lines, overlayBody, slotContent } from '../../../code-connect/helpers';

const sheet = figma.selectedInstance;

// The Figma component is the open sheet. In code it is declared with its trigger, so the snippet
// shows an example trigger to replace. `Scrollable` is handled by the sheet itself.
// The header and footer are the internal `.Dialog Header` / `.Dialog Footer` instances; the footer
// buttons are rendered by the Button template.
const header = sheet.findInstance('.Dialog Header');
const showTitle =
	header.type === 'INSTANCE' &&
	header.getEnum('Type', { Header: true, 'Close only': false, 'Icon button close': false });
const footer = sheet.findInstance('.Dialog Footer');
const buttons = footer.type === 'INSTANCE' ? slotContent(footer, 'Button group') : [];

const headerMarkup = showTitle
	? `\n\t\t<caps-sheet-header>\n\t\t\t<caps-sheet-title>Title</caps-sheet-title>\n\t\t</caps-sheet-header>`
	: '';
const footerMarkup =
	buttons.length === 0
		? ''
		: figma.code`\n\t\t<caps-sheet-footer>${lines(buttons, '\t\t\t')}\n\t\t</caps-sheet-footer>`;

export default {
	example: figma.code`<caps-sheet>
	<button capsSheetTrigger capsButton variant="outline">Open</button>
	<ng-template capsSheetContent side="right">${headerMarkup}${overlayBody(sheet, 'Slot', '\t\t')}${footerMarkup}
	</ng-template>
</caps-sheet>`,
	imports: [
		"import { CapsSheetImports } from '@capsule-ng/caps/sheet';",
		"import { CapsButtonImports } from '@capsule-ng/caps/button';",
	],
	id: 'caps-sheet',
};
