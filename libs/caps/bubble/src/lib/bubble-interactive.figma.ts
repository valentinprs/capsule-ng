// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2229-15547
// source=libs/caps/bubble/src/lib/caps-bubble-content.ts
// component=CapsBubbleContentDirective
import figma from 'figma';
import { bubbleImport, bubbleVariant } from '../../../code-connect/chat';

const bubble = figma.selectedInstance;

// A whole-content native action: `button[capsBubbleContent]`. `State` (Hover / Focus) is a CSS
// state. Figma's Suggestion (an outline with a stronger border) has no variant in code and is mapped
// to `outline`. The text is a fixed layer, not a property.
const variant = bubble.getEnum('Variant', { ...bubbleVariant, Suggestion: ' variant="outline"' }) ?? '';
const text = bubble.findText('Bubble text');

export default {
	example: figma.code`<caps-bubble${variant}>
	<button capsBubbleContent type="button">${text.type === 'TEXT' ? text.textContent : 'Bubble text'}</button>
</caps-bubble>`,
	imports: [bubbleImport],
	id: 'caps-bubble-interactive',
};
