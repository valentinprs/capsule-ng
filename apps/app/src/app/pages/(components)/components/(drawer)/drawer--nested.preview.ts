import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDrawerImports } from '@capsule-ng/caps/drawer';

@Component({
	selector: 'spartan-drawer-nested-preview',
	imports: [CapsDrawerImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-drawer>
			<button capsDrawerTrigger capsButton variant="outline">Open Drawer</button>
			<ng-template capsDrawerContent>
				<caps-drawer-header>
					<caps-drawer-title>Profile Settings</caps-drawer-title>
					<caps-drawer-description>Manage your account settings.</caps-drawer-description>
				</caps-drawer-header>
				<div class="px-4">
					<p class="mb-4 leading-normal">This is the first drawer. You can open another drawer on top of this one.</p>
					<caps-drawer>
						<button capsDrawerTrigger capsButton variant="outline">Open Nested</button>
						<ng-template capsDrawerContent>
							<caps-drawer-header>
								<caps-drawer-title>Nested Drawer</caps-drawer-title>
								<caps-drawer-description>This drawer is nested inside the first one.</caps-drawer-description>
							</caps-drawer-header>
							<div class="px-4">
								<p class="mb-4 leading-normal">Nested drawers allow you to layer content without losing context.</p>
							</div>
							<caps-drawer-footer>
								<button capsDrawerClose capsButton variant="outline">Close</button>
							</caps-drawer-footer>
						</ng-template>
					</caps-drawer>
				</div>
				<caps-drawer-footer>
					<button capsDrawerClose capsButton variant="outline">Close</button>
				</caps-drawer-footer>
			</ng-template>
		</caps-drawer>
	`,
})
export class DrawerNestedPreview {}
