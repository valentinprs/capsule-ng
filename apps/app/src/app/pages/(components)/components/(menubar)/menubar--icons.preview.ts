import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsMenubarImports } from '@capsule-ng/caps/menubar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFile, lucideFolder, lucideHelpCircle, lucideSave, lucideSettings, lucideTrash } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-menubar-icons',
	imports: [CapsMenubarImports, CapsDropdownMenuImports, NgIcon],
	providers: [provideIcons({ lucideFile, lucideFolder, lucideSave, lucideSettings, lucideHelpCircle, lucideTrash })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-menubar>
			<button [capsMenubarTrigger]="file">File</button>
			<button [capsMenubarTrigger]="more">More</button>
		</caps-menubar>

		<ng-template #file>
			<caps-menu class="w-48">
				<caps-menu-group>
					<button capsMenuItem>
						<ng-icon name="lucideFile" />
						New File
						<caps-menu-shortcut>⌘N</caps-menu-shortcut>
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideFolder" />
						Open Folder
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem>
					<ng-icon name="lucideSave" />
					Save
					<caps-menu-shortcut>⌘S</caps-menu-shortcut>
				</button>
			</caps-menu>
		</ng-template>

		<ng-template #more>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuItem>
						<ng-icon name="lucideSettings" />
						Settings
					</button>
					<button capsMenuItem>
						<ng-icon name="lucideHelpCircle" />
						Help
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem danger>
					<ng-icon name="lucideTrash" />
					Delete
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class MenubarIcons {}
