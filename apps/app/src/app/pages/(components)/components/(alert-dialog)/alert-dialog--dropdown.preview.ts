import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAlertDialogImports } from '@capsule-ng/caps/alert-dialog';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

@Component({
	selector: 'spartan-alert-dialog-dropdown',
	imports: [CapsAlertDialogImports, CapsButtonImports, HlmDropdownMenuImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [hlmDropdownMenuTrigger]="menu">Open Menu</button>

		<ng-template #menu>
			<hlm-dropdown-menu>
				<hlm-dropdown-menu-group>
					<button hlmDropdownMenuItem>Edit</button>
					<button hlmDropdownMenuItem>Share</button>
				</hlm-dropdown-menu-group>
				<hlm-dropdown-menu-separator />
				<button hlmDropdownMenuItem variant="destructive" [capsAlertDialogTriggerFor]="deleteDialog">Delete</button>
			</hlm-dropdown-menu>
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
