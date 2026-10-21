// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-32090
// source=libs/caps/avatar/src/lib/caps-avatar-badge.ts
// component=CapsAvatar
import figma from 'figma';
import { avatarSize } from '../../../code-connect/helpers';

// The initials are a fixed text in Figma. The Figma status badge is green: its color comes from a
// class, as in the docs.
export default {
	example: figma.code`<caps-avatar${figma.selectedInstance.getEnum('Size', avatarSize)}>
	<caps-avatar-fallback>CN</caps-avatar-fallback>
	<caps-avatar-badge class="bg-(--caps-background-accent-green-strong)" />
</caps-avatar>`,
	imports: ["import { CapsAvatarImports } from '@capsule-ng/caps/avatar';"],
	id: 'caps-avatar-status-badge',
};
