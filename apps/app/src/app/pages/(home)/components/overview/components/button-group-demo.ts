import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideArchive,
	lucideArrowLeft,
	lucideCalendarPlus,
	lucideClock,
	lucideEllipsis,
	lucideListFilterPlus,
	lucideMailCheck,
	lucideTag,
	lucideTrash,
} from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-group-demo',
	imports: [CapsButtonGroupImports, CapsDropdownMenuImports, CapsButton, NgIcon],
	providers: [
		provideIcons({
			lucideArrowLeft,
			lucideEllipsis,
			lucideMailCheck,
			lucideArchive,
			lucideClock,
			lucideCalendarPlus,
			lucideTag,

			lucideTrash,
			lucideListFilterPlus,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-button-group aria-label="Actions">
			<button capsButton variant="outline" size="icon-sm" aria-label="Go Back">
				<ng-icon name="lucideArrowLeft" />
			</button>

			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline" size="sm">Archive</button>
				<button capsButton variant="outline" size="sm">Report</button>
			</caps-button-group>
			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline" size="sm">Snooze</button>
				<button capsButton variant="outline" size="sm" [capsDropdownMenuTrigger]="menu" placement="bottom-end">
					<ng-icon name="lucideEllipsis" />
				</button>
			</caps-button-group>
		</caps-button-group>
		<ng-template #menu>
			<caps-menu class="w-56">
				<caps-menu-group>
					<button capsMenuItem>
						<ng-icon name="lucideMailCheck" />
						<span>Mark as Read</span>
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideArchive" />
						<span>Archive</span>
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<caps-menu-group>
					<button capsMenuItem>
						<ng-icon name="lucideClock" />
						<span>Snooze</span>
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideCalendarPlus" />
						<span>Add to Calendar</span>
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideListFilterPlus" />
						<span>Add to List</span>
					</button>
					<button [capsMenuSubTrigger]="submenu">
						<ng-icon name="lucideTag" />
						<span>Label as...</span>
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem danger>
					<ng-icon name="lucideTrash" class="!text-destructive" />
					<span>Delete</span>
				</button>
			</caps-menu>
		</ng-template>

		<ng-template #submenu>
			<caps-menu class="w-40">
				<caps-menu-group type="radio" [(value)]="label">
					<button capsMenuRadioItem value="personal">
						<span>Personal</span>
					</button>
					<button capsMenuRadioItem value="work">
						<span>Work</span>
					</button>
					<button capsMenuRadioItem value="other">
						<span>Other</span>
					</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>
	`,
})
export class ButtonGroupDemo {
	public readonly label = signal<string | string[]>('personal');
}
