import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDrawerImports } from '@capsule-ng/caps/drawer';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-drawer-preview',
	imports: [CapsDrawerImports, CapsButtonImports, CapsFieldImports, CapsInputImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-drawer>
			<button id="edit-profile" capsDrawerTrigger capsButton variant="outline">Open Drawer</button>
			<ng-template capsDrawerContent>
				<caps-drawer-header>
					<caps-drawer-title>Edit Profile</caps-drawer-title>
					<caps-drawer-description>
						Make changes to your profile here. Click save when you're done.
					</caps-drawer-description>
				</caps-drawer-header>
				<caps-field-group class="px-4">
					<caps-field>
						<caps-field-label>Name</caps-field-label>
						<input capsInput value="Pedro Duarte" />
					</caps-field>
					<caps-field>
						<caps-field-label>Username</caps-field-label>
						<input capsInput value="peduarte" />
					</caps-field>
				</caps-field-group>
				<caps-drawer-footer>
					<button capsButton type="submit">Save Changes</button>
					<button capsDrawerClose capsButton variant="outline">Cancel</button>
				</caps-drawer-footer>
			</ng-template>
		</caps-drawer>
	`,
})
export class DrawerPreview {}

export const defaultImports = `
import { CapsDrawerImports } from '@capsule-ng/caps/drawer';
import { CapsButtonImports } from '@capsule-ng/caps/button';
`;

export const defaultSkeleton = `
<caps-drawer>
  <button capsDrawerTrigger capsButton variant="outline">Open</button>
  <ng-template capsDrawerContent>
    <caps-drawer-header>
      <caps-drawer-title>Edit profile</caps-drawer-title>
      <caps-drawer-description>Make changes to your public profile.</caps-drawer-description>
    </caps-drawer-header>
    <caps-drawer-footer>
      <button capsButton capsDrawerClose variant="outline">Close</button>
    </caps-drawer-footer>
  </ng-template>
</caps-drawer>
`;
