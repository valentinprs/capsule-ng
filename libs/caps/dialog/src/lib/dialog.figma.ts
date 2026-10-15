// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-22846
// source=libs/caps/dialog/src/lib/caps-dialog.ts
// component=CapsDialog
import figma from 'figma';
import { overlayBody } from '../../../code-connect/helpers';

// The Figma component is the open overlay. In code it is declared with its trigger, so the snippet
// shows an example trigger to replace. `Type` (desktop / mobile, scrollable) is handled by the dialog itself.
export default {
	example: figma.code`<caps-dialog>
	<button capsDialogTrigger capsButton variant="outline">Open</button>
	<ng-template capsDialogContent let-ctx>${overlayBody(figma.selectedInstance, 'Slot', '\t\t')}
	</ng-template>
</caps-dialog>`,
	imports: [
		"import { CapsDialogImports } from '@capsule-ng/caps/dialog';",
		"import { CapsButtonImports } from '@capsule-ng/caps/button';",
	],
	id: 'caps-dialog',
};
