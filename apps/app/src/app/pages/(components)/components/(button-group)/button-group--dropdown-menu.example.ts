import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideCheck,
	lucideChevronDown,
	lucideCopy,
	lucideShare,
	lucideTrash,
	lucideTriangleAlert,
	lucideUserRoundX,
	lucideVolumeOff,
} from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-group-dropdown-menu',
	imports: [CapsButtonImports, CapsButtonGroupImports, CapsDropdownMenuImports, NgIcon],
	providers: [
		provideIcons({
			lucideChevronDown,
			lucideVolumeOff,
			lucideCheck,
			lucideTriangleAlert,
			lucideUserRoundX,
			lucideShare,
			lucideCopy,
			lucideTrash,
		}),
	],
	template: `
		<caps-button-group aria-label="Actions">
			<button capsButton variant="outline">Follow</button>
			<button
				capsButton
				variant="outline"
				size="icon"
				aria-label="Conversation options"
				[capsDropdownMenuTrigger]="menu"
				placement="bottom-end"
			>
				<ng-icon name="lucideChevronDown" />
			</button>
		</caps-button-group>
		<ng-template #menu>
			<caps-menu class="w-[49] [--radius:1rem]">
				<caps-menu-group>
					<button capsMenuItem>
						<ng-icon name="lucideVolumeOff" />
						<span>Muted Conversation</span>
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideCheck" />
						<span>Mark as Read</span>
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideTriangleAlert" />
						<span>Report Conversation</span>
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideUserRoundX" />
						<span>Block User</span>
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideShare" />
						<span>Share Conversation</span>
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideCopy" />
						<span>Copy Conversation</span>
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem danger>
					<ng-icon name="lucideTrash" class="!text-destructive" />
					<span>Delete Conversation</span>
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class ButtonGroupDropdownMenu {}
