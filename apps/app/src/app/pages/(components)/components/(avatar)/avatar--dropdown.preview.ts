import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';

@Component({
	selector: 'spartan-avatar-dropdown-preview',
	imports: [CapsAvatarImports, CapsDropdownMenuImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="ghost" size="icon" class="rounded-full" [capsDropdownMenuTrigger]="menu">
			<caps-avatar>
				<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" />
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
		</button>

		<ng-template #menu>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuItem>Profile</button>
					<button capsMenuItem>Billing</button>
					<button capsMenuItem>Settings</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem danger>Log out</button>
			</caps-menu>
		</ng-template>
	`,
})
export class AvatarDropdownPreview {}
