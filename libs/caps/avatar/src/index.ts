import { CapsAvatar } from './lib/caps-avatar';
import { CapsAvatarBadge } from './lib/caps-avatar-badge';
import { CapsAvatarFallback } from './lib/caps-avatar-fallback';
import { CapsAvatarGroup } from './lib/caps-avatar-group';
import { CapsAvatarGroupCount } from './lib/caps-avatar-group-count';
import { CapsAvatarImage } from './lib/caps-avatar-image';

export * from './lib/caps-avatar';
export * from './lib/caps-avatar-badge';
export * from './lib/caps-avatar-fallback';
export * from './lib/caps-avatar-group';
export * from './lib/caps-avatar-group-count';
export * from './lib/caps-avatar-image';

export const CapsAvatarImports = [
	CapsAvatar,
	CapsAvatarBadge,
	CapsAvatarFallback,
	CapsAvatarGroup,
	CapsAvatarGroupCount,
	CapsAvatarImage,
] as const;
