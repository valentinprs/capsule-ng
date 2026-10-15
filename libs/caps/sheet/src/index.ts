import { CapsSheet } from './lib/caps-sheet';
import { CapsSheetClose } from './lib/caps-sheet-close';
import { CapsSheetContent } from './lib/caps-sheet-content';
import { CapsSheetDescription } from './lib/caps-sheet-description';
import { CapsSheetFooter } from './lib/caps-sheet-footer';
import { CapsSheetHeader } from './lib/caps-sheet-header';
import { CapsSheetTitle } from './lib/caps-sheet-title';
import { CapsSheetTrigger } from './lib/caps-sheet-trigger';
export {
	BrnDialogRef as CapsSheetRef,
	injectBrnDialogContext as injectCapsSheetContext,
} from '@spartan-ng/brain/dialog';
export { CapsSheet } from './lib/caps-sheet';
export { CapsSheetClose } from './lib/caps-sheet-close';
export { CapsSheetContent } from './lib/caps-sheet-content';
export { CapsSheetDescription } from './lib/caps-sheet-description';
export { CapsSheetFooter } from './lib/caps-sheet-footer';
export { CapsSheetHeader } from './lib/caps-sheet-header';
export { CapsSheetTitle } from './lib/caps-sheet-title';
export { CapsSheetTrigger } from './lib/caps-sheet-trigger';
export const CapsSheetImports = [
	CapsSheet,
	CapsSheetContent,
	CapsSheetTrigger,
	CapsSheetClose,
	CapsSheetHeader,
	CapsSheetFooter,
	CapsSheetTitle,
	CapsSheetDescription,
] as const;

export { CapsSheetPanel as ɵCapsSheetPanel } from './lib/caps-sheet-panel';
