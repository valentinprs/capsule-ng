import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';

@Component({
	selector: 'spartan-dropdown-basic',
	imports: [CapsDropdownMenuImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu" placement="bottom-start">Open</button>

		<ng-template #menu>
			<caps-menu>
				<caps-menu-group label="My Account">
					<button capsMenuItem>Profile</button>
					<button capsMenuItem>Billing</button>
					<button capsMenuItem>Settings</button>
				</caps-menu-group>
				<caps-menu-separator />
				<caps-menu-group>
					<button capsMenuItem>GitHub</button>
					<button capsMenuItem>Support</button>
					<button capsMenuItem disabled>API</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>
	`,
})
export class DropdownBasic {}
