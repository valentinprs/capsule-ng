import { CapsMenuImports } from '@capsule-ng/caps/menu';
import { CapsContextMenuTrigger } from './lib/caps-context-menu-trigger';
export * from '@capsule-ng/caps/menu';
export { CapsContextMenuTrigger } from './lib/caps-context-menu-trigger';
export const CapsContextMenuImports = [...CapsMenuImports, CapsContextMenuTrigger] as const;
// Required by Angular partial compilation; not part of the supported composition API.
export { CapsContextMenuCdk } from './lib/caps-context-menu-trigger';
