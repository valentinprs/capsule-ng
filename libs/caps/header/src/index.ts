import { CapsHeader } from './lib/caps-header';
import { CapsHeaderActions } from './lib/caps-header-actions';
import { CapsHeaderLogo } from './lib/caps-header-logo';
import { CapsHeaderMenu } from './lib/caps-header-menu';
import { CapsHeaderNav } from './lib/caps-header-nav';
import { CapsHeaderTitle } from './lib/caps-header-title';
import { CapsHeaderVisual } from './lib/caps-header-visual';

export * from './lib/caps-header';
export * from './lib/caps-header-actions';
export * from './lib/caps-header-logo';
export * from './lib/caps-header-menu';
export * from './lib/caps-header-nav';
export * from './lib/caps-header-title';
export * from './lib/caps-header-visual';

export const CapsHeaderImports = [
	CapsHeader,
	CapsHeaderMenu,
	CapsHeaderVisual,
	CapsHeaderTitle,
	CapsHeaderNav,
	CapsHeaderActions,
	CapsHeaderLogo,
] as const;
