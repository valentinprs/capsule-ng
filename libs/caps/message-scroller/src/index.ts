import { CapsMessageScroller } from './lib/caps-message-scroller';
import { CapsMessageScrollerButton } from './lib/caps-message-scroller-button';
import { CapsMessageScrollerItem, CapsMessageScrollerItemDirective } from './lib/caps-message-scroller-item';
export * from './lib/caps-message-scroller';
export * from './lib/caps-message-scroller-button';
export * from './lib/caps-message-scroller-item';
// Angular partial compilation needs these public symbols; their interface is internal.
export { CapsMessageScrollerBehavior, CapsMessageScrollerViewportBehavior } from './lib/caps-message-scroller-behavior';
export * from './lib/caps-message-scroller.types';
export const CapsMessageScrollerImports = [
	CapsMessageScroller,
	CapsMessageScrollerItem,
	CapsMessageScrollerItemDirective,
	CapsMessageScrollerButton,
] as const;
