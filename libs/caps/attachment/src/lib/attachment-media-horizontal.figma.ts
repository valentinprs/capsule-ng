// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2229-15194
// source=libs/caps/attachment/src/lib/caps-attachment-media.ts
// component=CapsAttachmentMedia
import figma from 'figma';
import { attachmentImport, attachmentMedia } from '../../../code-connect/chat';
import { iconImports } from '../../../code-connect/helpers';

// The media part of an attachment. Not mapped: `Size` (the `size` of the parent `caps-attachment`)
// and `Icon destructive` (its color comes from the parent `state="error"`).
const media = attachmentMedia(figma.selectedInstance, 'Icon');

export default {
	example: figma.code`${media.markup}`,
	imports: [attachmentImport, ...iconImports(media.icons)],
	id: 'caps-attachment-media-horizontal',
};
