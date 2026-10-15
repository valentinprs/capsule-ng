// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2229-15257
// source=libs/caps/attachment/src/lib/caps-attachment-media.ts
// component=CapsAttachmentMedia
import figma from 'figma';
import { attachmentActions, attachmentImport, attachmentMedia } from '../../../code-connect/chat';
import { iconImports } from '../../../code-connect/helpers';

// The media part of a vertical attachment. In Figma the actions sit on the media; in code
// `caps-attachment-actions` is a sibling of the media, so it follows it. Not mapped: `Icon
// destructive` (its color comes from the parent `state="error"`).
const owner = figma.selectedInstance;
const media = attachmentMedia(owner, 'Icon');
const actions = owner.getBoolean('Show actions')
	? attachmentActions(owner, [
			{ layer: 'Action 2', show: '⮑ Show action 2' },
			{ layer: 'Action 1', show: '⮑ Show action 1' },
		])
	: { markup: null, icons: [] };

export default {
	example: figma.code`${media.markup}${actions.markup ? `\n${actions.markup}` : ''}`,
	imports: [attachmentImport, ...iconImports([...media.icons, ...actions.icons])],
	id: 'caps-attachment-media-vertical',
};
