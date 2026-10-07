import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsSheetImports } from '@capsule-ng/caps/sheet';

@Component({
	selector: 'spartan-sheet-preview',
	imports: [CapsSheetImports, CapsFieldImports, CapsButtonImports, CapsInputImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sheet>
			<button id="edit-profile" capsSheetTrigger capsButton variant="outline">Open</button>
			<ng-template capsSheetContent side="right">
				<caps-sheet-header>
					<caps-sheet-title>Edit Profile</caps-sheet-title>
					<caps-sheet-description>
						Make changes to your profile here. Click save when you're done.
					</caps-sheet-description>
				</caps-sheet-header>
				<caps-field-group class="px-4">
					<caps-field>
						<caps-field-label>Name</caps-field-label>
						<input capsInput value="Pedro Duarte" />
					</caps-field>
					<caps-field>
						<caps-field-label>Username</caps-field-label>
						<input capsInput value="@peduarte" />
					</caps-field>
				</caps-field-group>
				<caps-sheet-footer>
					<button capsButton type="submit">Save Changes</button>
					<button capsSheetClose capsButton variant="outline">Close</button>
				</caps-sheet-footer>
			</ng-template>
		</caps-sheet>
	`,
})
export class SheetPreview {}

export const defaultImports = `
import { CapsSheetImports } from '@capsule-ng/caps/sheet';
import { CapsButtonImports } from '@capsule-ng/caps/button';
`;

export const defaultSkeleton = `
<caps-sheet>
  <button capsSheetTrigger capsButton variant="outline">Open</button>
  <ng-template capsSheetContent>
    <caps-sheet-header>
      <caps-sheet-title>Edit profile</caps-sheet-title>
      <caps-sheet-description>Make changes to your public profile.</caps-sheet-description>
    </caps-sheet-header>
    <caps-sheet-footer>
      <button capsButton capsSheetClose variant="outline">Close</button>
    </caps-sheet-footer>
  </ng-template>
</caps-sheet>
`;
