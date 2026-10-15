import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCreditCard, lucideLogOut, lucideSettings, lucideUser } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-dropdown-icons',
	imports: [CapsDropdownMenuImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideUser, lucideCreditCard, lucideSettings, lucideLogOut })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu" placement="bottom-start">Open</button>

		<ng-template #menu>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuItem>
						<ng-icon name="lucideUser" />
						Profile
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideCreditCard" />
						Billing
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideSettings" />
						Settings
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem danger>
					<ng-icon name="lucideLogOut" />
					Log out
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class DropdownIcons {}
