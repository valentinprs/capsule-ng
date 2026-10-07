import { Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
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
	selector: 'spartan-button-group-preview',
	imports: [CapsButtonImports, CapsButtonGroupImports, CapsDropdownMenuImports, NgIcon],
	providers: [
		provideIcons({
			lucideArrowLeft,
			lucideEllipsis,
			lucideMailCheck,
			lucideArchive,
			lucideClock,
			lucideCalendarPlus,
			lucideListFilterPlus,
			lucideTag,
			lucideTrash,
		}),
	],
	template: `
		<caps-button-group aria-label="Actions">
			<button capsButton variant="outline" size="icon" aria-label="Go Back" class="hidden sm:flex">
				<ng-icon name="lucideArrowLeft" />
			</button>

			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline">Archive</button>
				<button capsButton variant="outline">Report</button>
			</caps-button-group>
			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline">Snooze</button>
				<button
					capsButton
					variant="outline"
					aria-label="More Options"
					[capsDropdownMenuTrigger]="menu"
					placement="bottom-end"
				>
					<ng-icon name="lucideEllipsis" />
				</button>
			</caps-button-group>
		</caps-button-group>
		<ng-template #menu>
			<caps-menu class="w-52">
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
					<button align="start" side="right" [capsMenuSubTrigger]="submenu">
						<ng-icon name="lucideTag" />
						<span>Label as...</span>
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem danger>
					<ng-icon name="lucideTrash" />
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
export class ButtonGroupPreview {
	public readonly label = signal<string | string[]>('personal');
}

export const defaultImports = `
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
`;

export const defaultSkeleton = `
<caps-button-group aria-label="Actions">
  <button capsButton variant="outline">Button 1</button>
  <button capsButton variant="outline">Button 2</button>
</caps-button-group>
`;

export const accessibilityCode = `
<caps-button-group aria-label="Button group">
	<button capsButton variant="outline">Button 1</button>
	<button capsButton variant="outline">Button 2</button>
</caps-button-group>
`;
