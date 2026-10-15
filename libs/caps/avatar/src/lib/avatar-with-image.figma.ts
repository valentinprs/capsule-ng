// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-32193
// source=libs/caps/avatar/src/lib/caps-avatar.ts
// component=CapsAvatar
import figma from 'figma';
import { avatarSize } from '../../../code-connect/helpers';

export default {
	example: figma.code`<caps-avatar${figma.selectedInstance.getEnum('Size', avatarSize)}>
	<img capsAvatarImage src="" alt="" />
</caps-avatar>`,
	imports: ["import { CapsAvatarImports } from '@capsule-ng/caps/avatar';"],
	id: 'caps-avatar-image',
};
