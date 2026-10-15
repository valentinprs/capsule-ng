// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2229-15226
// source=libs/caps/attachment/src/lib/caps-attachment.ts
// component=CapsAttachment
import figma from 'figma';
import { attachmentActions, attachmentImport, attachmentMedia } from '../../../code-connect/chat';
import { element, iconImports, type Icon } from '../../../code-connect/helpers';

const attachment = figma.selectedInstance;

// Default and Send are the `done` state, the code default. The media and its actions come from the
// nested Attachment Media Vertical instance (in Figma the actions sit on the media). Not mapped: the
// media `Icon destructive` type, whose color comes from `state="error"`.
const state =
	attachment.getEnum('State', { Default: '', Send: '', Idle: ' state="idle"', Error: ' state="error"' }) ?? '';
const icons: Icon[] = [];

let media: string | null = null;
let actions: string | null = null;
const mediaInstance = attachment.findInstance('Attachment Media Vertical');
if (attachment.getBoolean('Show media') && mediaInstance.type === 'INSTANCE') {
	const resolved = attachmentMedia(mediaInstance, 'Icon', '\t');
	icons.push(...resolved.icons);
	media = resolved.markup;
	if (mediaInstance.getBoolean('Show actions')) {
		const shown = attachmentActions(
			mediaInstance,
			[
				{ layer: 'Action 2', show: '⮑ Show action 2' },
				{ layer: 'Action 1', show: '⮑ Show action 1' },
			],
			'\t',
		);
		icons.push(...shown.icons);
		actions = shown.markup;
	}
}
const description = attachment.getBoolean('Show description')
	? `\n\t\t<caps-attachment-description>${attachment.getString('⮑ Description')}</caps-attachment-description>`
	: '';
const content = `<caps-attachment-content>\n\t\t<caps-attachment-title>${attachment.getString('Title')}</caps-attachment-title>${description}\n\t</caps-attachment-content>`;

export default {
	example: figma.code`${element(`<caps-attachment orientation="vertical"${state}>`, [media, content, actions], '</caps-attachment>')}`,
	imports: [attachmentImport, ...iconImports(icons)],
	id: 'caps-attachment-card-vertical',
};
