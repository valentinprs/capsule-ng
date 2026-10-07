import { CapsMenuImports } from '@capsule-ng/caps/menu';
import { CapsMenubar } from './lib/caps-menubar';
import { CapsMenubarTrigger } from './lib/caps-menubar-trigger';
export * from '@capsule-ng/caps/menu';
export { CapsMenubar } from './lib/caps-menubar';
export { CapsMenubarTrigger } from './lib/caps-menubar-trigger';
export const CapsMenubarImports = [...CapsMenuImports, CapsMenubar, CapsMenubarTrigger] as const;
// Required by Angular partial compilation; not part of the supported composition API.
export { CapsMenubarCdk } from './lib/caps-menubar';
