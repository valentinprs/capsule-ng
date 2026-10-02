import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDialogImports } from '@capsule-ng/caps/dialog';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-dialog-sticky-footer',
	imports: [CapsDialogImports, CapsFieldImports, CapsInputImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-dialog>
			<button capsDialogTrigger capsButton variant="outline">Sticky Footer</button>
			<ng-template capsDialogContent let-ctx class="sm:max-w-sm">
				<caps-dialog-header>
					<caps-dialog-title>Sticky Footer</caps-dialog-title>
					<caps-dialog-description>
						This dialog has a sticky footer that stays visible while the content scrolls.
					</caps-dialog-description>
				</caps-dialog-header>
				<div
					role="region"
					aria-label="Dialog content"
					tabindex="0"
					class="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4"
				>
					@for (item of _items; track item) {
						<p class="mb-4 leading-normal">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
							ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
							fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</p>
					}
				</div>
				<caps-dialog-footer>
					<button capsButton variant="outline" capsDialogClose>Close</button>
				</caps-dialog-footer>
			</ng-template>
		</caps-dialog>
	`,
})
export class DialogStickyFooter {
	protected readonly _items = Array.from({ length: 5 }, (_, i) => i + 1);
}
