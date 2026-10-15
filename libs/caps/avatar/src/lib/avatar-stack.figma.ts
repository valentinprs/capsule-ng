// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-32217
// source=libs/caps/avatar/src/lib/caps-avatar-group.ts
// component=CapsAvatarGroup
import figma from 'figma';

const stack = figma.selectedInstance;

// The first two avatars are always shown; the next ones follow the `Show 3rd|4th|5th` toggles.
const count = 2 + ['Show 3rd', 'Show 4th', 'Show 5th'].filter((prop) => stack.getBoolean(prop)).length;
// Avatars are Avatar With Image instances, rendered by their own template.
const avatars = stack.findConnectedInstances(() => true).slice(0, count);
const content = avatars.reduce(
	(code, avatar) => figma.code`${code}\n\t${avatar.type === 'INSTANCE' ? avatar.executeTemplate().example : ''}`,
	figma.code``,
);

export default {
	example: figma.code`<caps-avatar-group>${content}\n</caps-avatar-group>`,
	imports: ["import { CapsAvatarImports } from '@capsule-ng/caps/avatar';"],
	id: 'caps-avatar-group',
};
