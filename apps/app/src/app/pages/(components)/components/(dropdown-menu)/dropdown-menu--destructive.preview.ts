import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePencil, lucideShare, lucideTrash2 } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-dropdown-destructive',
	imports: [CapsDropdownMenuImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucidePencil, lucideShare, lucideTrash2 })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu" placement="bottom-start">Action</button>

		<ng-template #menu>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuItem>
						<ng-icon name="lucidePencil" />
						Edit
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideShare" />
						Share
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem danger>
					<ng-icon name="lucideTrash2" />
					Delete
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class DropdownDestructive {}
