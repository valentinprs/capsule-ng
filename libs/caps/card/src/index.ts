import { CapsCard } from './lib/caps-card';
import { CapsCardAction } from './lib/caps-card-action';
import { CapsCardContent } from './lib/caps-card-content';
import { CapsCardDescription } from './lib/caps-card-description';
import { CapsCardFooter } from './lib/caps-card-footer';
import { CapsCardHeader } from './lib/caps-card-header';
import { CapsCardTitle } from './lib/caps-card-title';

export * from './lib/caps-card';
export * from './lib/caps-card-action';
export * from './lib/caps-card-content';
export * from './lib/caps-card-description';
export * from './lib/caps-card-footer';
export * from './lib/caps-card-header';
export * from './lib/caps-card-title';

export const CapsCardImports = [
	CapsCardAction,
	CapsCardContent,
	CapsCardDescription,
	CapsCardFooter,
	CapsCardHeader,
	CapsCardTitle,
	CapsCard,
] as const;
