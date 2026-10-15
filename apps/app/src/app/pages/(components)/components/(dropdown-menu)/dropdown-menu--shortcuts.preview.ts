import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';

@Component({
	selector: 'spartan-dropdown-shortcuts',
	imports: [CapsDropdownMenuImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu" placement="bottom-start">Open</button>

		<ng-template #menu>
			<caps-menu>
				<caps-menu-group label="My Account">
					<button capsMenuItem>
						Profile
						<caps-menu-shortcut>⇧⌘P</caps-menu-shortcut>
					</button>
					<button capsMenuItem>
						Billing
						<caps-menu-shortcut>⌘B</caps-menu-shortcut>
					</button>
					<button capsMenuItem>
						Settings
						<caps-menu-shortcut>⌘S</caps-menu-shortcut>
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem>
					Log out
					<caps-menu-shortcut>⇧⌘Q</caps-menu-shortcut>
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class DropdownShortcuts {}
