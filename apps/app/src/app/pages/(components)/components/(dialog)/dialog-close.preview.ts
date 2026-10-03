import { Component, viewChild } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDialog, CapsDialogImports } from '@capsule-ng/caps/dialog';
import { CapsLabelImports } from '@capsule-ng/caps/label';

@Component({
	selector: 'spartan-dialog-close-preview',
	imports: [CapsDialogImports, CapsLabelImports, CapsButtonImports],
	template: `
		<caps-dialog #dialogRef>
			<button id="edit-profile" capsDialogTrigger capsButton>Open</button>
			<ng-template capsDialogContent let-ctx class="sm:max-w-[425px]">
				<caps-dialog-header>
					<caps-dialog-title>Dialog</caps-dialog-title>
				</caps-dialog-header>
				<div class="grid gap-4 py-4">
					<div class="flex items-center justify-between gap-4">
						<label capsLabel>Close dialog by directive</label>
						<button capsButton capsDialogClose>Close</button>
					</div>
					<div class="flex items-center justify-between gap-4">
						<label capsLabel>Close dialog by reference</label>
						<button capsButton (click)="dialogRef.close({})">Close</button>
					</div>
					<div class="flex items-center justify-between gap-4">
						<label capsLabel>Close dialog by viewchild reference</label>
						<button capsButton (click)="closeDialog()">Close</button>
					</div>
				</div>
			</ng-template>
		</caps-dialog>
	`,
})
export class DialogClosePreview {
	public readonly viewchildDialogRef = viewChild(CapsDialog);

	closeDialog() {
		this.viewchildDialogRef()?.close({});
	}
}
