import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsContextMenuImports } from '@capsule-ng/caps/context-menu';
import { CapsDialogImports } from '@capsule-ng/caps/dialog';

@Component({
	selector: 'spartan-dialog-context-menu',
	imports: [CapsDialogImports, CapsButtonImports, CapsContextMenuImports],
	template: `
		<div
			[capsContextMenuTrigger]="menu"
			class="border-border flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
			tabindex="0"
		>
			Right click here
		</div>

		<ng-template #menu>
			<caps-menu class="w-64">
				<caps-menu-group>
					<button capsMenuItem>
						Save
						<caps-menu-shortcut>⌘S</caps-menu-shortcut>
					</button>

					<button disabled capsMenuItem>
						Archive
						<caps-menu-shortcut>⌘A</caps-menu-shortcut>
					</button>

					<button capsMenuItem inset="true" [capsDialogTriggerFor]="dialog">
						Print
						<caps-menu-shortcut>⌘P</caps-menu-shortcut>
					</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>

		<caps-dialog #dialog>
			<ng-template capsDialogContent let-ctx class="sm:max-w-[425px]">
				<caps-dialog-header>
					<caps-dialog-title>Print this page</caps-dialog-title>
					<caps-dialog-description>
						Are you sure you want to print this page? Only print if absolutely necessary! The less we print, the less
						paper we need, the better it is for our environment!
					</caps-dialog-description>
				</caps-dialog-header>
				<caps-dialog-footer>
					<button capsButton variant="ghost" (click)="ctx.close()">Cancel</button>
					<button capsButton>Print</button>
				</caps-dialog-footer>
			</ng-template>
		</caps-dialog>
	`,
})
export class DialogContextMenuPreview {}
