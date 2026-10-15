// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2229-15505
// source=libs/caps/bubble/src/lib/caps-bubble-group.ts
// component=CapsBubbleGroup
import figma from 'figma';
import { bubble } from '../../../code-connect/chat';
import { nested } from '../../../code-connect/helpers';

const group = figma.selectedInstance;

// The bubbles of the slot are rendered like the Bubble template, with `align="end"` when the group
// is aligned right (`caps-bubble-group` has no alignment input).
const align = group.getEnum('Alignment', { Left: '', Right: ' align="end"' }) ?? '';
// Nested in another instance the slot may not expose its content: the connected bubbles are then
// searched in the layers.
const slotted = group.getSlot('Bubble group')?.connectedInstances ?? [];
const items =
	slotted.length > 0
		? slotted
		: group
				.findConnectedInstances((node) => node.codeConnectId() === 'caps-bubble')
				.filter((node) => node.type === 'INSTANCE');
const bubbles = items.map((item) => bubble(item, align));

export default {
	example: figma.code`<caps-bubble-group>${nested(
		bubbles.map((item) => item.snippet),
		'\t',
	)}
</caps-bubble-group>`,
	imports: [...new Set(bubbles.flatMap((item) => item.imports))],
	id: 'caps-bubble-group',
};
