import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsSheetImports } from '@capsule-ng/caps/sheet';

@Component({
	selector: 'spartan-sheet-side-preview',
	imports: [CapsSheetImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sheet>
			<div class="flex flex-wrap gap-2">
				<button id="top" capsSheetTrigger side="top" capsButton variant="outline">Top</button>
				<button id="right" capsSheetTrigger side="right" capsButton variant="outline">Right</button>
				<button id="bottom" capsSheetTrigger side="bottom" capsButton variant="outline">Bottom</button>
				<button id="left" capsSheetTrigger side="left" capsButton variant="outline">Left</button>
			</div>
			<ng-template capsSheetContent [class]="'data-[side=bottom]:max-h-[50vh] data-[side=top]:max-h-[50vh]'">
				<caps-sheet-header>
					<caps-sheet-title>Edit profile</caps-sheet-title>
					<caps-sheet-description>
						Make changes to your profile here. Click save when you're done.
					</caps-sheet-description>
				</caps-sheet-header>
				<div
					class="no-scrollbar overflow-y-auto px-4 focus-visible:outline-2 focus-visible:outline-offset-2"
					tabindex="0"
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
				<caps-sheet-footer>
					<button capsButton>Save changes</button>
					<button capsButton variant="outline" capsSheetClose>Cancel</button>
				</caps-sheet-footer>
			</ng-template>
		</caps-sheet>
	`,
})
export class SheetSidePreview {
	protected readonly _items = Array.from({ length: 10 }, (_, i) => i + 1);
}
