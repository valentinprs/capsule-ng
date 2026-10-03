import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAlertDialogImports } from '@capsule-ng/caps/alert-dialog';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-alert-dialog-preview',
	imports: [CapsAlertDialogImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-alert-dialog>
			<button capsAlertDialogTrigger capsButton variant="outline">Show Dialog</button>
			<ng-template capsAlertDialogContent let-ctx>
				<caps-alert-dialog-header>
					<caps-alert-dialog-title>Are you absolutely sure?</caps-alert-dialog-title>
					<caps-alert-dialog-description>
						This action cannot be undone. This will permanently delete your account from our servers.
					</caps-alert-dialog-description>
				</caps-alert-dialog-header>
				<caps-alert-dialog-footer>
					<button capsAlertDialogCancel capsButton variant="outline">Cancel</button>
					<button capsButton (click)="ctx.close()">Continue</button>
				</caps-alert-dialog-footer>
			</ng-template>
		</caps-alert-dialog>
	`,
})
export class AlertDialogPreview {}

export const defaultImports = `
import { CapsAlertDialogImports } from '@capsule-ng/caps/alert-dialog';
`;

export const defaultSkeleton = `
<caps-alert-dialog>
  <button capsAlertDialogTrigger capsButton variant="outline">Show Dialog</button>
  <ng-template capsAlertDialogContent let-ctx >
    <caps-alert-dialog-header>
      <caps-alert-dialog-title >Are you absolutely sure?</caps-alert-dialog-title>
      <caps-alert-dialog-description >This action cannot be undone. This will permanently delete your account from our servers.</caps-alert-dialog-description>
    </caps-alert-dialog-header>
    <caps-alert-dialog-footer>
      <button capsAlertDialogCancel capsButton variant="outline">Cancel</button>
      <button capsButton (click)="ctx.close()">Continue</button>
    </caps-alert-dialog-footer>
  </ng-template>
</caps-alert-dialog>
`;
