import { CapsDialog } from './lib/caps-dialog';
import { CapsDialogClose } from './lib/caps-dialog-close';
import { CapsDialogContent } from './lib/caps-dialog-content';
import { CapsDialogDescription } from './lib/caps-dialog-description';
import { CapsDialogFooter } from './lib/caps-dialog-footer';
import { CapsDialogHeader } from './lib/caps-dialog-header';
import { CapsDialogTitle } from './lib/caps-dialog-title';
import { CapsDialogTrigger } from './lib/caps-dialog-trigger';
export {
	BrnDialogRef as CapsDialogRef,
	injectBrnDialogContext as injectCapsDialogContext,
	provideBrnDialogDefaultOptions as provideCapsDialogDefaultOptions,
} from '@spartan-ng/brain/dialog';
export {
	CapsDialog,
	CAPS_DIALOG_TEMPLATE as ɵCAPS_DIALOG_TEMPLATE,
	CapsDialogBase as ɵCapsDialogBase,
} from './lib/caps-dialog';
export { CapsDialogClose } from './lib/caps-dialog-close';
export { CapsDialogContent } from './lib/caps-dialog-content';
export { CapsDialogDescription } from './lib/caps-dialog-description';
export { CapsDialogFooter } from './lib/caps-dialog-footer';
export { CapsDialogHeader } from './lib/caps-dialog-header';
export { CapsDialogPanel as ɵCapsDialogPanel } from './lib/caps-dialog-panel';
export { CapsDialogTitle } from './lib/caps-dialog-title';
export { CapsDialogTrigger } from './lib/caps-dialog-trigger';
export { CapsDialogService, type CapsDialogOptions } from './lib/caps-dialog.service';
export const CapsDialogImports = [
	CapsDialog,
	CapsDialogHeader,
	CapsDialogFooter,
	CapsDialogTitle,
	CapsDialogDescription,
	CapsDialogClose,
	CapsDialogContent,
	CapsDialogTrigger,
] as const;
