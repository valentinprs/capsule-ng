import { CapsMessage } from './lib/caps-message';
import { CapsMessageAvatar } from './lib/caps-message-avatar';
import { CapsMessageContent } from './lib/caps-message-content';
import { CapsMessageFooter } from './lib/caps-message-footer';
import { CapsMessageGroup } from './lib/caps-message-group';
import { CapsMessageHeader } from './lib/caps-message-header';

export * from './lib/caps-message';
export * from './lib/caps-message-avatar';
export * from './lib/caps-message-content';
export * from './lib/caps-message-footer';
export * from './lib/caps-message-group';
export * from './lib/caps-message-header';

export const CapsMessageImports = [
	CapsMessage,
	CapsMessageAvatar,
	CapsMessageContent,
	CapsMessageFooter,
	CapsMessageGroup,
	CapsMessageHeader,
] as const;
