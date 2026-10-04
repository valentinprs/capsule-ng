import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

@Component({
	selector: 'spartan-avatar-dropdown-preview',
	imports: [CapsAvatarImports, HlmDropdownMenuImports, CapsButtonImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="ghost" size="icon" class="rounded-full" [hlmDropdownMenuTrigger]="menu">
			<caps-avatar>
				<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" />
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
		</button>

		<ng-template #menu>
			<hlm-dropdown-menu>
				<hlm-dropdown-menu-group>
					<button hlmDropdownMenuItem>Profile</button>
					<button hlmDropdownMenuItem>Billing</button>
					<button hlmDropdownMenuItem>Settings</button>
				</hlm-dropdown-menu-group>
				<hlm-dropdown-menu-separator />
				<hlm-dropdown-menu-group>
					<button hlmDropdownMenuItem variant="destructive">Log out</button>
				</hlm-dropdown-menu-group>
			</hlm-dropdown-menu>
		</ng-template>
	`,
})
export class AvatarDropdownPreview {}
