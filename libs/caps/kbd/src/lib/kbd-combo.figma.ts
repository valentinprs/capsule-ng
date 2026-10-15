// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1957-52466
// source=libs/caps/kbd/src/lib/caps-kbd.ts
// component=CapsKbdGroup
import figma from 'figma';
import { element } from '../../../code-connect/helpers';

const combo = figma.selectedInstance;

/** The key typed in one of the nested `kbd` instances. */
function key(layer: string): string {
	const instance = combo.findInstance(layer);
	return instance.type === 'INSTANCE' ? `<kbd capsKbd>${instance.getString('Key')}</kbd>` : '';
}

const snippet = element(
	'<caps-kbd-group>',
	combo.getBoolean('Show key 2') ? [key('Key 1'), '<span>+</span>', key('Key 2')] : [key('Key 1')],
	'</caps-kbd-group>',
);

export default {
	example: figma.code`${snippet}`,
	imports: ["import { CapsKbdImports } from '@capsule-ng/caps/kbd';"],
	id: 'caps-kbd-group',
};
