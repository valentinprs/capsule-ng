import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDrawerImports } from '@capsule-ng/caps/drawer';

@Component({
	selector: 'spartan-drawer-direction-preview',
	imports: [CapsDrawerImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-drawer>
			<div class="flex flex-wrap gap-2">
				<button id="bottom" capsDrawerTrigger side="bottom" capsButton variant="outline">Bottom</button>
				<button id="top" capsDrawerTrigger side="top" capsButton variant="outline">Top</button>
				<button id="left" capsDrawerTrigger side="left" capsButton variant="outline">Left</button>
				<button id="right" capsDrawerTrigger side="right" capsButton variant="outline">Right</button>
			</div>
			<ng-template capsDrawerContent>
				<caps-drawer-header>
					<caps-drawer-title>Edit profile</caps-drawer-title>
					<caps-drawer-description>
						Make changes to your profile here. Click save when you're done.
					</caps-drawer-description>
				</caps-drawer-header>
				<div class="px-4">
					@for (item of _items; track item) {
						<p class="mb-4 leading-normal">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua.
						</p>
					}
				</div>
				<caps-drawer-footer>
					<button capsButton>Save changes</button>
					<button capsButton variant="outline" capsDrawerClose>Cancel</button>
				</caps-drawer-footer>
			</ng-template>
		</caps-drawer>
	`,
})
export class DrawerDirectionPreview {
	protected readonly _items = Array.from({ length: 3 }, (_, i) => i + 1);
}
