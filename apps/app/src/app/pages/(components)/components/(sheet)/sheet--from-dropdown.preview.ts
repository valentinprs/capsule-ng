import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsSheetImports } from '@capsule-ng/caps/sheet';

@Component({
	selector: 'spartan-sheet-from-dropdown-preview',
	imports: [CapsSheetImports, CapsDropdownMenuImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button #options capsButton variant="outline" [capsDropdownMenuTrigger]="menu">Options</button>

		<!-- Keep the sheet outside the dropdown's ng-template so closing the menu does not destroy it. -->
		<caps-sheet #sheet="capsSheet" [restoreFocus]="options">
			<ng-template capsSheetContent side="right">
				<caps-sheet-header>
					<caps-sheet-title>Edit Profile</caps-sheet-title>
					<caps-sheet-description>
						Make changes to your profile here. Click save when you're done.
					</caps-sheet-description>
				</caps-sheet-header>
				<caps-sheet-footer>
					<button capsButton type="submit">Save Changes</button>
					<button capsSheetClose capsButton variant="outline">Close</button>
				</caps-sheet-footer>
			</ng-template>
		</caps-sheet>

		<ng-template #menu>
			<caps-menu class="w-40">
				<button capsMenuItem (itemClick)="sheet.show()">Edit Profile</button>
				<button capsMenuItem>Duplicate</button>
				<caps-menu-separator />
				<button capsMenuItem>Delete</button>
			</caps-menu>
		</ng-template>
	`,
})
export class SheetFromDropdownPreview {}
