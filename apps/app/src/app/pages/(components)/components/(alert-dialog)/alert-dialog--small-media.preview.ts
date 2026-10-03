import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAlertDialogImports } from '@capsule-ng/caps/alert-dialog';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBluetooth } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-alert-dialog-small-media',
	imports: [CapsAlertDialogImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideBluetooth })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-alert-dialog>
			<button capsAlertDialogTrigger capsButton variant="outline">Show Dialog</button>
			<ng-template capsAlertDialogContent let-ctx size="sm">
				<caps-alert-dialog-header>
					<caps-alert-dialog-media>
						<ng-icon name="lucideBluetooth" />
					</caps-alert-dialog-media>
					<caps-alert-dialog-title>Allow accessory to connect?</caps-alert-dialog-title>
					<caps-alert-dialog-description>
						Do you want to allow the USB accessory to connect to this device?
					</caps-alert-dialog-description>
				</caps-alert-dialog-header>
				<caps-alert-dialog-footer>
					<button capsAlertDialogCancel capsButton variant="outline">Don't allow</button>
					<button capsButton (click)="ctx.close()">Allow</button>
				</caps-alert-dialog-footer>
			</ng-template>
		</caps-alert-dialog>
	`,
})
export class AlertDialogSmallMedia {}
