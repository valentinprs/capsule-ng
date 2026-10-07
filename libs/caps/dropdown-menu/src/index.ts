import { CapsMenuImports } from '@capsule-ng/caps/menu';
import { CapsDropdownMenuTrigger } from './lib/caps-dropdown-menu-trigger';
export * from '@capsule-ng/caps/menu';
export { CapsDropdownMenuTrigger, type CapsMenuPlacement } from './lib/caps-dropdown-menu-trigger';
export const CapsDropdownMenuImports = [...CapsMenuImports, CapsDropdownMenuTrigger] as const;
