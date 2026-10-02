import { CapsDialogContent, CapsDialogTrigger } from '@capsule-ng/caps/dialog';
import { CapsAlertDialog } from './lib/caps-alert-dialog';
import { CapsAlertDialogCancel } from './lib/caps-alert-dialog-cancel';
import { CapsAlertDialogDescription } from './lib/caps-alert-dialog-description';
import { CapsAlertDialogFooter } from './lib/caps-alert-dialog-footer';
import { CapsAlertDialogHeader } from './lib/caps-alert-dialog-header';
import { CapsAlertDialogMedia } from './lib/caps-alert-dialog-media';
import { CapsAlertDialogTitle } from './lib/caps-alert-dialog-title';
export {
	CapsDialogContent as CapsAlertDialogContent,
	CapsDialogTrigger as CapsAlertDialogTrigger,
} from '@capsule-ng/caps/dialog';
export { CapsAlertDialog } from './lib/caps-alert-dialog';
export { CapsAlertDialogCancel } from './lib/caps-alert-dialog-cancel';
export { CapsAlertDialogDescription } from './lib/caps-alert-dialog-description';
export { CapsAlertDialogFooter } from './lib/caps-alert-dialog-footer';
export { CapsAlertDialogHeader } from './lib/caps-alert-dialog-header';
export { CapsAlertDialogMedia } from './lib/caps-alert-dialog-media';
export { CapsAlertDialogTitle } from './lib/caps-alert-dialog-title';
export const CapsAlertDialogImports = [
	CapsAlertDialog,
	CapsAlertDialogHeader,
	CapsAlertDialogFooter,
	CapsAlertDialogTitle,
	CapsAlertDialogDescription,
	CapsAlertDialogCancel,
	CapsAlertDialogMedia,
	CapsDialogContent,
	CapsDialogTrigger,
] as const;
