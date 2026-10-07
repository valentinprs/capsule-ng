import { CapsAttachment } from './lib/caps-attachment';
import { CapsAttachmentAction } from './lib/caps-attachment-action';
import { CapsAttachmentActions } from './lib/caps-attachment-actions';
import { CapsAttachmentContent } from './lib/caps-attachment-content';
import { CapsAttachmentDescription } from './lib/caps-attachment-description';
import { CapsAttachmentGroup } from './lib/caps-attachment-group';
import { CapsAttachmentMedia } from './lib/caps-attachment-media';
import { CapsAttachmentTitle } from './lib/caps-attachment-title';
import { CapsAttachmentTrigger } from './lib/caps-attachment-trigger';

export * from './lib/caps-attachment';
export * from './lib/caps-attachment-action';
export * from './lib/caps-attachment-actions';
export * from './lib/caps-attachment-content';
export * from './lib/caps-attachment-description';
export * from './lib/caps-attachment-group';
export * from './lib/caps-attachment-media';
export * from './lib/caps-attachment-title';
export * from './lib/caps-attachment-trigger';

export const CapsAttachmentImports = [
	CapsAttachment,
	CapsAttachmentAction,
	CapsAttachmentActions,
	CapsAttachmentContent,
	CapsAttachmentDescription,
	CapsAttachmentGroup,
	CapsAttachmentMedia,
	CapsAttachmentTitle,
	CapsAttachmentTrigger,
] as const;
