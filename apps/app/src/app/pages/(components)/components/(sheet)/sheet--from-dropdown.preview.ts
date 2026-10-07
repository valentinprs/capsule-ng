import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';

@Component({
	selector: 'spartan-sheet-from-dropdown-preview',
	imports: [HlmSheetImports, CapsDropdownMenuImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu">Options</button>

		<!-- Keep the sheet outside the dropdown's ng-template so closing the menu does not destroy it. -->
		<hlm-sheet #sheet="hlmSheet" side="right">
			<hlm-sheet-content *hlmSheetPortal="let ctx">
				<hlm-sheet-header>
					<h3 hlmSheetTitle>Edit Profile</h3>
					<p hlmSheetDescription>Make changes to your profile here. Click save when you're done.</p>
				</hlm-sheet-header>
				<hlm-sheet-footer>
					<button capsButton type="submit">Save Changes</button>
					<button hlmSheetClose capsButton variant="outline">Close</button>
				</hlm-sheet-footer>
			</hlm-sheet-content>
		</hlm-sheet>

		<ng-template #menu>
			<caps-menu class="w-40">
				<button capsMenuItem (itemClick)="sheet.open()">Edit Profile</button>
				<button capsMenuItem>Duplicate</button>
				<caps-menu-separator />
				<button capsMenuItem>Delete</button>
			</caps-menu>
		</ng-template>
	`,
})
export class SheetFromDropdownPreview {}
