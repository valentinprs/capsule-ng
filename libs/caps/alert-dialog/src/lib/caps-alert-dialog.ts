import { Dir } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ɵCAPS_DIALOG_TEMPLATE, ɵCapsDialogBase, ɵCapsDialogPanel } from '@capsule-ng/caps/dialog';
import { BrnDialog, provideBrnDialogDefaultOptions } from '@spartan-ng/brain/dialog';
@Component({
	selector: 'caps-alert-dialog',
	exportAs: 'capsAlertDialog',
	imports: [NgTemplateOutlet, ɵCapsDialogPanel],
	providers: [provideBrnDialogDefaultOptions({ role: 'alertdialog', closeOnOutsidePointerEvents: false })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [
		{ directive: Dir, inputs: ['dir'] },
		{
			directive: BrnDialog,
			inputs: ['disableClose', 'autoFocus', 'restoreFocus', 'aria-label', 'aria-labelledby', 'aria-describedby'],
		},
	],
	template: ɵCAPS_DIALOG_TEMPLATE,
})
export class CapsAlertDialog extends ɵCapsDialogBase {}
