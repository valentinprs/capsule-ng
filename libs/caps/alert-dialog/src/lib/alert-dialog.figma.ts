// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=1953-32398
// source=libs/caps/alert-dialog/src/lib/caps-alert-dialog.ts
// component=CapsAlertDialog
import figma from 'figma';
import { buttonLabel } from '../../../code-connect/helpers';

const dialog = figma.selectedInstance;

// The Figma component is the open dialog. In code it is declared with its trigger, so the snippet
// shows an example trigger to replace. `Size` has no input in code; the decorative icon has no
// Code Connect yet, so it is a placeholder in `caps-alert-dialog-media`.
// The footer buttons come from the `.Alert Dialog Footer` slot: the first one cancels, the last one
// confirms (destructive for `Variant=Destructive`).
const footer = dialog.findInstance('.Alert Dialog Footer');
const buttons = footer.type === 'INSTANCE' ? (footer.getSlot('Button group')?.connectedInstances ?? []) : [];
const cancel = buttonLabel(buttons[0], 'Cancel');
const action = buttonLabel(buttons.length > 1 ? buttons[buttons.length - 1] : undefined, 'Continue');
const destructive = dialog.getEnum('Variant', { Regular: '', Destructive: ' variant="destructive"' });
const media = dialog.getBoolean('Show decorative icon')
	? '\n\t\t\t<caps-alert-dialog-media><!-- icon --></caps-alert-dialog-media>'
	: '';

export default {
	example: figma.code`<caps-alert-dialog>
	<button capsAlertDialogTrigger capsButton variant="outline">Open</button>
	<ng-template capsAlertDialogContent let-ctx>
		<caps-alert-dialog-header>${media}
			<caps-alert-dialog-title>${dialog.getString('Title')}</caps-alert-dialog-title>
			<caps-alert-dialog-description>${dialog.getString('Description')}</caps-alert-dialog-description>
		</caps-alert-dialog-header>
		<caps-alert-dialog-footer>
			<button capsAlertDialogCancel capsButton variant="outline">${cancel}</button>
			<button capsButton${destructive} (click)="ctx.close()">${action}</button>
		</caps-alert-dialog-footer>
	</ng-template>
</caps-alert-dialog>`,
	imports: [
		"import { CapsAlertDialogImports } from '@capsule-ng/caps/alert-dialog';",
		"import { CapsButtonImports } from '@capsule-ng/caps/button';",
	],
	id: 'caps-alert-dialog',
};
