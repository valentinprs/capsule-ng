import { CapsMenu, CapsMenuGroup, CapsMenuLabel, CapsMenuSeparator, CapsMenuShortcut } from './lib/caps-menu';
import { CapsMenuCheckboxItem, CapsMenuItem, CapsMenuRadioItem } from './lib/caps-menu-item';
import { CapsMenuSubTrigger } from './lib/caps-menu-sub-trigger';
export { CapsMenu, CapsMenuGroup, CapsMenuLabel, CapsMenuSeparator, CapsMenuShortcut } from './lib/caps-menu';
export { CapsMenuCheckboxItem, CapsMenuItem, CapsMenuRadioItem } from './lib/caps-menu-item';
export { CapsMenuSubTrigger } from './lib/caps-menu-sub-trigger';
export const CapsMenuImports = [
	CapsMenu,
	CapsMenuGroup,
	CapsMenuLabel,
	CapsMenuSeparator,
	CapsMenuShortcut,
	CapsMenuItem,
	CapsMenuCheckboxItem,
	CapsMenuRadioItem,
	CapsMenuSubTrigger,
] as const;
// Angular partial compilation requires host directives to be exported; these are internal adapters.
export { CapsMenuCdk } from './lib/caps-menu';
export { CapsMenuFocusOnHover } from './lib/caps-menu-focus-on-hover';
export { CapsMenuCheckboxCdk, CapsMenuRadioCdk } from './lib/caps-menu-item';
