// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1999-15000
// source=libs/caps/command/src/lib/caps-command.ts
// component=CapsCommand
import figma from 'figma';
import { indented, lines } from '../../../code-connect/helpers';

const command = figma.selectedInstance;

// The placeholder is the value of the `Input` inside `.Command Search Input`. Groups and separators
// of the slot are rendered by their own templates; separators inside a command are
// `caps-command-separator`, not the standalone `caps-separator`. The empty state has no Figma layer.
const search = command.findInstance('.Command Search Input');
const input = search.type === 'INSTANCE' ? search.findInstance('Input') : search;
const placeholder = input.type === 'INSTANCE' ? input.getString('Value') : 'Type a command or search...';
const content = (command.getSlot('Command content')?.connectedInstances ?? []).map((item) =>
	item.codeConnectId() === 'caps-separator'
		? '<caps-command-separator />'
		: indented(item.executeTemplate().example, '\t\t'),
);
const list = content.length === 0 ? '\n\t\t<!-- groups -->' : lines(content, '\t\t');

export default {
	example: figma.code`<caps-command>
	<caps-command-input placeholder="${placeholder}" />
	<caps-command-list>
		<caps-command-empty>No results found.</caps-command-empty>${list}
	</caps-command-list>
</caps-command>`,
	imports: ["import { CapsCommandImports } from '@capsule-ng/caps/command';"],
	id: 'caps-command',
};
