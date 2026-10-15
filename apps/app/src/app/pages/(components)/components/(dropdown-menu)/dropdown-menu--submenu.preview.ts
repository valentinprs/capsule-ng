import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';

@Component({
	selector: 'spartan-dropdown-submenu',
	imports: [CapsDropdownMenuImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu" placement="bottom-start">Open</button>

		<ng-template #menu>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuItem>Team</button>
					<button [capsMenuSubTrigger]="invite" side="right" align="start">Invite users</button>
					<button capsMenuItem>
						New Team
						<caps-menu-shortcut>⌘+T</caps-menu-shortcut>
					</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>

		<ng-template #invite>
			<caps-menu>
				<button capsMenuItem>Email</button>
				<button capsMenuItem>Message</button>
				<button [capsMenuSubTrigger]="moreOptions" side="right" align="start">More options</button>
				<caps-menu-separator />
				<button capsMenuItem>Advanced...</button>
			</caps-menu>
		</ng-template>

		<ng-template #moreOptions>
			<caps-menu>
				<button capsMenuItem>Calendly</button>
				<button capsMenuItem>Slack</button>
				<caps-menu-separator />
				<button capsMenuItem>Webhook</button>
			</caps-menu>
		</ng-template>
	`,
})
export class DropdownSubmenu {}
