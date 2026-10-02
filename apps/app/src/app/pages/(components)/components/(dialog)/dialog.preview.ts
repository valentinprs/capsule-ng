import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDialogImports } from '@capsule-ng/caps/dialog';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-dialog-preview',
	imports: [CapsDialogImports, CapsFieldImports, CapsInputImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-dialog>
			<button capsDialogTrigger capsButton variant="outline">Open Dialog</button>
			<ng-template capsDialogContent let-ctx class="sm:max-w-sm">
				<caps-dialog-header>
					<caps-dialog-title>Edit profile</caps-dialog-title>
					<caps-dialog-description>
						Make changes to your profile here. Click save when you're done.
					</caps-dialog-description>
				</caps-dialog-header>
				<caps-field-group>
					<caps-field>
						<caps-field-label for="name">Name</caps-field-label>
						<input capsInput id="name" value="Pedro Duarte" />
					</caps-field>
					<caps-field>
						<caps-field-label for="username">Username</caps-field-label>
						<input capsInput id="username" value="@peduarte" />
					</caps-field>
				</caps-field-group>
				<caps-dialog-footer>
					<button capsButton variant="outline" capsDialogClose>Cancel</button>
					<button capsButton type="submit">Save changes</button>
				</caps-dialog-footer>
			</ng-template>
		</caps-dialog>
	`,
})
export class DialogPreview {}

export const defaultImports = `
import { CapsDialogImports } from '@capsule-ng/caps/dialog';
`;

export const defaultSkeleton = `
<caps-dialog>
  <button capsDialogTrigger capsButton variant="outline">Open Dialog</button>
  <ng-template capsDialogContent let-ctx >
    <caps-dialog-header>
      <caps-dialog-title >Edit profile</caps-dialog-title>
      <caps-dialog-description >Make changes to your profile here. Click save when you're done.</caps-dialog-description>
    </caps-dialog-header>
    <caps-dialog-footer>
      <button capsButton variant="outline" capsDialogClose>Cancel</button>
      <button capsButton type="submit">Save changes</button>
    </caps-dialog-footer>
  </ng-template>
</caps-dialog>
`;
