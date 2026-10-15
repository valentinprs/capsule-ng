// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2229-16377
// source=libs/caps/message/src/lib/caps-message.ts
// component=CapsMessage
import figma from 'figma';
import { slotText } from '../../../code-connect/chat';
import { nested, type Part, slotContent } from '../../../code-connect/helpers';

const message = figma.selectedInstance;

// The avatar is the swapped Avatar instance and the message content the connected instances of the
// slot (Bubble, Bubble group...), rendered by their own templates. The header and footer slots hold
// plain text in Figma (layers `Name` / `Delivered`): their text is used. Hiding only the avatar
// image keeps an empty `caps-message-avatar`, as Figma keeps the avatar space.
const align = message.getEnum('Alignment', { Left: '', Right: ' align="end"' }) ?? '';
const showAvatar = message.getBoolean('Show avatar');
const avatar = message.getInstanceSwap('⮑ Avatar');
const avatarExample: Part =
	avatar?.type === 'INSTANCE' && avatar.hasCodeConnect() ? avatar.executeTemplate().example : '<caps-avatar />';
const avatarPart: Part = !showAvatar
	? ''
	: message.getBoolean('⮑ Show avatar image')
		? figma.code`\n\t<caps-message-avatar>${nested([avatarExample], '\t\t')}\n\t</caps-message-avatar>`
		: '\n\t<caps-message-avatar></caps-message-avatar>';

const header = message.getBoolean('Show header')
	? figma.code`\n\t\t<caps-message-header>${slotText(message, '⮑ Header', 'Name', 'Name', '\t\t\t')}</caps-message-header>`
	: '';
const footer = message.getBoolean('Show footer')
	? figma.code`\n\t\t<caps-message-footer>${slotText(message, '⮑ Footer', 'Delivered', 'Delivered', '\t\t\t')}</caps-message-footer>`
	: '';

export default {
	example: figma.code`<caps-message${align}>${avatarPart}
	<caps-message-content>${header}${nested(slotContent(message, 'Message content'), '\t\t')}${footer}
	</caps-message-content>
</caps-message>`,
	imports: ["import { CapsMessageImports } from '@capsule-ng/caps/message';"],
	id: 'caps-message',
};
