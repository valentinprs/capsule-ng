import { CapsDrawer } from './lib/caps-drawer';
import { CapsDrawerClose } from './lib/caps-drawer-close';
import { CapsDrawerContent } from './lib/caps-drawer-content';
import { CapsDrawerDescription } from './lib/caps-drawer-description';
import { CapsDrawerFooter } from './lib/caps-drawer-footer';
import { CapsDrawerHeader } from './lib/caps-drawer-header';
import { CapsDrawerTitle } from './lib/caps-drawer-title';
import { CapsDrawerTrigger } from './lib/caps-drawer-trigger';
export {
	BrnDialogRef as CapsDrawerRef,
	injectBrnDialogContext as injectCapsDrawerContext,
} from '@spartan-ng/brain/dialog';
export { CapsDrawer } from './lib/caps-drawer';
export { CapsDrawerClose } from './lib/caps-drawer-close';
export { CapsDrawerContent } from './lib/caps-drawer-content';
export { CapsDrawerDescription } from './lib/caps-drawer-description';
export { CapsDrawerFooter } from './lib/caps-drawer-footer';
export { CapsDrawerHeader } from './lib/caps-drawer-header';
export { CapsDrawerTitle } from './lib/caps-drawer-title';
export { CapsDrawerTrigger } from './lib/caps-drawer-trigger';
export const CapsDrawerImports = [
	CapsDrawer,
	CapsDrawerContent,
	CapsDrawerTrigger,
	CapsDrawerClose,
	CapsDrawerHeader,
	CapsDrawerFooter,
	CapsDrawerTitle,
	CapsDrawerDescription,
] as const;

export { CapsDrawerPanel as ɵCapsDrawerPanel } from './lib/caps-drawer-panel';
