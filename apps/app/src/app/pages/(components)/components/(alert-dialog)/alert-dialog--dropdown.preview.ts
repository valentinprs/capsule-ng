import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAlertDialogImports } from '@capsule-ng/caps/alert-dialog';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';

@Component({
	selector: 'spartan-alert-dialog-dropdown',
	imports: [CapsAlertDialogImports, CapsButtonImports, CapsDropdownMenuImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu">Open Menu</button>

		<ng-template #menu>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuItem>Edit</button>
					<button capsMenuItem>Share</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem danger [capsAlertDialogTriggerFor]="deleteDialog">Delete</button>
			</caps-menu>
		</ng-template>

		<caps-alert-dialog #deleteDialog="capsAlertDialog">
			<ng-template capsAlertDialogContent let-ctx>
				<caps-alert-dialog-header>
					<caps-alert-dialog-title>Are you absolutely sure?</caps-alert-dialog-title>
					<caps-alert-dialog-description>
						This action cannot be undone. This will permanently delete this item.
					</caps-alert-dialog-description>
				</caps-alert-dialog-header>
				<caps-alert-dialog-footer>
					<button capsAlertDialogCancel capsButton variant="outline">Cancel</button>
					<button
						capsButton
						(click)="ctx.close()"
						variant="destructive"
						class="bg-destructive text-primary-foreground hover:bg-destructive dark:bg-destructive dark:hover:bg-destructive"
					>
						Delete
					</button>
				</caps-alert-dialog-footer>
			</ng-template>
		</caps-alert-dialog>
	`,
})
export class AlertDialogDropdown {}
