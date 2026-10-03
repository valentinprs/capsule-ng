import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDialogImports } from '@capsule-ng/caps/dialog';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-dialog-no-close-button',
	imports: [CapsDialogImports, CapsFieldImports, CapsInputImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-dialog>
			<button capsDialogTrigger capsButton variant="outline">No Close Button</button>
			<ng-template capsDialogContent let-ctx [showCloseButton]="false" class="sm:max-w-sm">
				<caps-dialog-header>
					<caps-dialog-title>No Close Button</caps-dialog-title>
					<caps-dialog-description>This dialog does not have a close button in the header.</caps-dialog-description>
				</caps-dialog-header>
			</ng-template>
		</caps-dialog>
	`,
})
export class DialogNoCloseButton {}
