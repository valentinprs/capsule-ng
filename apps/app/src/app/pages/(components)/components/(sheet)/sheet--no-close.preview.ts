import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsSheetImports } from '@capsule-ng/caps/sheet';

@Component({
	selector: 'spartan-sheet-no-close',
	imports: [CapsSheetImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sheet>
			<button variant="outline" capsSheetTrigger capsButton>Open</button>
			<ng-template capsSheetContent side="right" [showCloseButton]="false">
				<caps-sheet-header>
					<caps-sheet-title tabindex="0" class="focus-visible:outline-2 focus-visible:outline-offset-2">
						No Close Button
					</caps-sheet-title>
					<caps-sheet-description>
						This sheet doesn't have a close button in the top-right corner. Click outside to close.
					</caps-sheet-description>
				</caps-sheet-header>
			</ng-template>
		</caps-sheet>
	`,
})
export class SheetNoClose {}
