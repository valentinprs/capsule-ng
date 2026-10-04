import { Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideArchive,
	lucideArrowLeft,
	lucideCalendarPlus,
	lucideChevronRight,
	lucideClock,
	lucideEllipsis,
	lucideListFilterPlus,
	lucideMailCheck,
	lucideTag,
	lucideTrash,
} from '@ng-icons/lucide';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

@Component({
	selector: 'spartan-button-group-preview',
	imports: [CapsButtonImports, CapsButtonGroupImports, HlmDropdownMenuImports, NgIcon],
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
			lucideChevronRight,
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
				<button capsButton variant="outline" aria-label="More Options" [hlmDropdownMenuTrigger]="menu" align="end">
					<ng-icon name="lucideEllipsis" />
				</button>
			</caps-button-group>
		</caps-button-group>
		<ng-template #menu>
			<hlm-dropdown-menu class="w-52">
				<hlm-dropdown-menu-group>
					<button hlmDropdownMenuItem>
						<ng-icon name="lucideMailCheck" />
						<span>Mark as Read</span>
					</button>
					<button hlmDropdownMenuItem>
						<ng-icon name="lucideArchive" />
						<span>Archive</span>
					</button>
				</hlm-dropdown-menu-group>
				<hlm-dropdown-menu-separator />
				<hlm-dropdown-menu-group>
					<button hlmDropdownMenuItem>
						<ng-icon name="lucideClock" />
						<span>Snooze</span>
					</button>
					<button hlmDropdownMenuItem>
						<ng-icon name="lucideCalendarPlus" />
						<span>Add to Calendar</span>
					</button>
					<button hlmDropdownMenuItem>
						<ng-icon name="lucideListFilterPlus" />
						<span>Add to List</span>
					</button>
					<button
						hlmDropdownMenuItem
						class="flex justify-between"
						align="start"
						side="right"
						[hlmDropdownMenuTrigger]="submenu"
					>
						<div class="flex items-center gap-2">
							<ng-icon name="lucideTag" />
							<span>Label as...</span>
						</div>
						<ng-icon name="lucideChevronRight" />
					</button>
				</hlm-dropdown-menu-group>
				<hlm-dropdown-menu-separator />
				<hlm-dropdown-menu-group>
					<button
						hlmDropdownMenuItem
						variant="destructive"
						class="hover:bg-destructive/10 dark:hover:bg-destructive/40"
					>
						<ng-icon name="lucideTrash" />
						<span>Delete</span>
					</button>
				</hlm-dropdown-menu-group>
			</hlm-dropdown-menu>
		</ng-template>
		<ng-template #submenu>
			<hlm-dropdown-menu-sub class="w-40">
				<button hlmDropdownMenuRadio [checked]="label() === 'personal'" (click)="label.set('personal')">
					<hlm-dropdown-menu-radio-indicator />
					<span>Personal</span>
				</button>
				<button hlmDropdownMenuRadio [checked]="label() === 'work'" (click)="label.set('work')">
					<hlm-dropdown-menu-radio-indicator />
					<span>Work</span>
				</button>
				<button hlmDropdownMenuRadio [checked]="label() === 'other'" (click)="label.set('other')">
					<hlm-dropdown-menu-radio-indicator />
					<span>Other</span>
				</button>
			</hlm-dropdown-menu-sub>
		</ng-template>
	`,
})
export class ButtonGroupPreview {
	public readonly label = signal('personal');
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
