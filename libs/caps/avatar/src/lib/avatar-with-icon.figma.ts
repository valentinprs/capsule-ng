// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-32140
// source=libs/caps/avatar/src/lib/caps-avatar-badge.ts
// component=CapsAvatar
import figma from 'figma';
import { avatarSize, icon, iconImports } from '../../../code-connect/helpers';

// The icon sits in the avatar badge. The initials are a fixed text in Figma.
const avatar = figma.selectedInstance;
const glyph = icon(avatar, 'Icon');

export default {
	example: figma.code`<caps-avatar${avatar.getEnum('Size', avatarSize)}>
	<caps-avatar-fallback>CN</caps-avatar-fallback>
	<caps-avatar-badge>
		${glyph.markup}
	</caps-avatar-badge>
</caps-avatar>`,
	imports: ["import { CapsAvatarImports } from '@capsule-ng/caps/avatar';", ...iconImports([glyph])],
	id: 'caps-avatar-icon',
};
