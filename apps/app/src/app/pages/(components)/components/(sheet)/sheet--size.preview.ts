import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsSheetImports } from '@capsule-ng/caps/sheet';

@Component({
	selector: 'spartan-sheet-size-preview',
	imports: [CapsSheetImports, CapsFieldImports, CapsButtonImports, CapsInputImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sheet>
			<button id="edit-profile" variant="outline" capsSheetTrigger capsButton>Open</button>
			<ng-template capsSheetContent side="right" [class]="'w-[400px] sm:w-[540px] sm:max-w-none'">
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
				</caps-sheet-footer>
			</ng-template>
		</caps-sheet>
	`,
})
export class SheetSizePreview {}
