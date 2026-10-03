import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAlertDialogImports } from '@capsule-ng/caps/alert-dialog';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleFadingPlus } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-alert-dialog-media',
	imports: [CapsAlertDialogImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideCircleFadingPlus })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-alert-dialog>
			<button capsAlertDialogTrigger capsButton variant="outline">Share Project</button>
			<ng-template capsAlertDialogContent let-ctx>
				<caps-alert-dialog-header>
					<caps-alert-dialog-media>
						<ng-icon name="lucideCircleFadingPlus" />
					</caps-alert-dialog-media>
					<caps-alert-dialog-title>Share this project?</caps-alert-dialog-title>
					<caps-alert-dialog-description>
						Anyone with the link will be able to view and edit this project.
					</caps-alert-dialog-description>
				</caps-alert-dialog-header>
				<caps-alert-dialog-footer>
					<button capsAlertDialogCancel capsButton variant="outline">Cancel</button>
					<button capsButton (click)="ctx.close()">Share</button>
				</caps-alert-dialog-footer>
			</ng-template>
		</caps-alert-dialog>
	`,
})
export class AlertDialogMedia {}
