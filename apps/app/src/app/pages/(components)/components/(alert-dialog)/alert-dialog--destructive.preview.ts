import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAlertDialogImports } from '@capsule-ng/caps/alert-dialog';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsLink } from '@capsule-ng/caps/link';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrash2 } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-alert-dialog-destructive',
	imports: [CapsAlertDialogImports, CapsButtonImports, CapsLink, NgIcon],
	providers: [provideIcons({ lucideTrash2 })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-alert-dialog>
			<button capsAlertDialogTrigger capsButton variant="destructive">Delete Chat</button>
			<ng-template capsAlertDialogContent let-ctx size="sm">
				<caps-alert-dialog-header>
					<caps-alert-dialog-media
						class="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive"
					>
						<ng-icon name="lucideTrash2" />
					</caps-alert-dialog-media>
					<caps-alert-dialog-title>Delete chat?</caps-alert-dialog-title>
					<caps-alert-dialog-description>
						This will permanently delete this chat conversation. View
						<a capsLink href="#">Settings</a>
						to delete any memories saved during this chat.
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
export class AlertDialogDestructive {}
