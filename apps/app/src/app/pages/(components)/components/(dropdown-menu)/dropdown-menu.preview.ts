import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';

@Component({
	selector: 'spartan-dropdown-preview',
	imports: [CapsDropdownMenuImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu" placement="bottom-start">Open</button>

		<ng-template #menu>
			<caps-menu class="w-40">
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
				<caps-menu-group>
					<button capsMenuItem>
						Team
						<caps-menu-shortcut>⌘B</caps-menu-shortcut>
					</button>
					<button side="right" align="start" [capsMenuSubTrigger]="invite">Invite Users</button>
					<button capsMenuItem>
						New Team
						<caps-menu-shortcut>⌘+T</caps-menu-shortcut>
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<caps-menu-group>
					<button capsMenuItem>GitHub</button>
					<button capsMenuItem>Support</button>
					<button capsMenuItem disabled>API</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem>
					Log out
					<caps-menu-shortcut>⇧⌘Q</caps-menu-shortcut>
				</button>
			</caps-menu>
		</ng-template>

		<ng-template #invite>
			<caps-menu>
				<button capsMenuItem>Email</button>
				<button capsMenuItem>Message</button>
				<caps-menu-separator />
				<button capsMenuItem>More...</button>
			</caps-menu>
		</ng-template>
	`,
})
export class DropdownPreview {}

export const defaultImports = `
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
`;

export const defaultSkeleton = `
<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu">Open</button>

<ng-template #menu>
  <caps-menu>
    <caps-menu-group label="My Account">
      <button capsMenuItem>Profile</button>
      <button capsMenuItem>Billing</button>
    </caps-menu-group>
    <caps-menu-separator />
    <caps-menu-group>
      <button capsMenuItem>Team</button>
      <button capsMenuItem>Subscription</button>
    </caps-menu-group>
  </caps-menu>
</ng-template>
`;
