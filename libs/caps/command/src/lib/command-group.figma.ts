// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1999-15022
// source=libs/caps/command/src/lib/caps-command-structure.ts
// component=CapsCommandGroup
import figma from 'figma';
import { indented, lines, slotContent } from '../../../code-connect/helpers';

const group = figma.selectedInstance;

// The title is the text of the nested `Command Group Label`, passed to the `label` input. Its
// `Type` and `Indented` have no input in code.
const heading = group.findInstance('Command Group Label');
const title = group.getBoolean('Show group title') && heading.type === 'INSTANCE' ? heading.getString('Label') : '';
const items = slotContent(group, 'Slot').map((item) => indented(item, '\t'));
const body = items.length === 0 ? '\n\t<!-- items -->' : lines(items, '\t');

export default {
	example: figma.code`<caps-command-group${title ? ` label="${title}"` : ''}>${body}
</caps-command-group>`,
	imports: ["import { CapsCommandImports } from '@capsule-ng/caps/command';"],
	id: 'caps-command-group',
};
