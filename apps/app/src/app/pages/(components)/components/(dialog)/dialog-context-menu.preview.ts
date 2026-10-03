import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDialogImports } from '@capsule-ng/caps/dialog';
import { HlmContextMenuImports } from '@spartan-ng/helm/context-menu';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

@Component({
	selector: 'spartan-dialog-context-menu',
	imports: [CapsDialogImports, CapsButtonImports, HlmDropdownMenuImports, HlmContextMenuImports],
	template: `
		<div
			[hlmContextMenuTrigger]="menu"
			class="border-border flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
		>
			Right click here
		</div>

		<ng-template #menu>
			<hlm-dropdown-menu class="w-64">
				<hlm-dropdown-menu-group>
					<button inset hlmDropdownMenuItem>
						Save
						<hlm-dropdown-menu-shortcut>⌘S</hlm-dropdown-menu-shortcut>
					</button>

					<button disabled inset hlmDropdownMenuItem>
						Archive
						<hlm-dropdown-menu-shortcut>⌘A</hlm-dropdown-menu-shortcut>
					</button>

					<button hlmDropdownMenuItem inset="true" [capsDialogTriggerFor]="dialog">
						Print
						<hlm-dropdown-menu-shortcut>⌘P</hlm-dropdown-menu-shortcut>
					</button>
				</hlm-dropdown-menu-group>
			</hlm-dropdown-menu>
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
