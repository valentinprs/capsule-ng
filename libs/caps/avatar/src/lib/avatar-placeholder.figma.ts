// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-32067
// source=libs/caps/avatar/src/lib/caps-avatar.ts
// component=CapsAvatar
import figma from 'figma';
import { avatarSize } from '../../../code-connect/helpers';

const avatar = figma.selectedInstance;

export default {
	example: figma.code`<caps-avatar${avatar.getEnum('Size', avatarSize)}>
	<caps-avatar-fallback>${avatar.getString('Initials')}</caps-avatar-fallback>
</caps-avatar>`,
	imports: ["import { CapsAvatarImports } from '@capsule-ng/caps/avatar';"],
	id: 'caps-avatar-placeholder',
};
