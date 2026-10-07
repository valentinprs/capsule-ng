import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsMenubarImports } from '@capsule-ng/caps/menubar';

@Component({
	selector: 'spartan-menubar-preview',
	imports: [CapsMenubarImports, CapsDropdownMenuImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-menubar>
			<button [capsMenubarTrigger]="file">File</button>
			<button [capsMenubarTrigger]="edit">Edit</button>
			<button [capsMenubarTrigger]="view">View</button>
			<button [capsMenubarTrigger]="profiles">Profiles</button>
		</caps-menubar>

		<ng-template #file>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuItem>
						New Tab
						<caps-menu-shortcut>⌘T</caps-menu-shortcut>
					</button>
					<button capsMenuItem>
						New Window
						<caps-menu-shortcut>⌘N</caps-menu-shortcut>
					</button>
					<button capsMenuItem disabled>New Incognito Window</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button [capsMenuSubTrigger]="share" align="start" side="right">Share</button>
				<caps-menu-separator />
				<button capsMenuItem>
					Print
					<caps-menu-shortcut>⌘P</caps-menu-shortcut>
				</button>
			</caps-menu>
		</ng-template>
		<ng-template #share>
			<caps-menu>
				<button capsMenuItem>Email link</button>
				<button capsMenuItem>Messages</button>
				<button capsMenuItem>Notes</button>
			</caps-menu>
		</ng-template>

		<ng-template #edit>
			<caps-menu class="w-48">
				<caps-menu-group>
					<button capsMenuItem>
						Undo
						<caps-menu-shortcut>⌘Z</caps-menu-shortcut>
					</button>
					<button capsMenuItem>
						Redo
						<caps-menu-shortcut>⇧⌘Z</caps-menu-shortcut>
					</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button [capsMenuSubTrigger]="find" align="start" side="right">Find</button>
				<caps-menu-separator />
				<button capsMenuItem>Cut</button>
				<button capsMenuItem>Copy</button>
				<button capsMenuItem>Paste</button>
			</caps-menu>
		</ng-template>
		<ng-template #find>
			<caps-menu>
				<button capsMenuItem>Search the web</button>
				<caps-menu-separator />
				<button capsMenuItem>Find...</button>
				<button capsMenuItem>Find Next</button>
				<button capsMenuItem>Find Previous</button>
			</caps-menu>
		</ng-template>

		<ng-template #view>
			<caps-menu>
				<button capsMenuCheckboxItem>Bookmarks Bar</button>
				<button capsMenuCheckboxItem [checked]="true">Full URLs</button>
				<caps-menu-separator />
				<button capsMenuItem>
					Reload
					<caps-menu-shortcut>⌘R</caps-menu-shortcut>
				</button>
				<button capsMenuItem disabled>
					Force Reload
					<caps-menu-shortcut>⇧⌘R</caps-menu-shortcut>
				</button>
				<caps-menu-separator />
				<button capsMenuItem>Toggle Fullscreen</button>
				<caps-menu-separator />
				<button capsMenuItem>Hide Sidebar</button>
			</caps-menu>
		</ng-template>

		<ng-template #profiles>
			<caps-menu class="w-48">
				<button capsMenuRadioItem>Andy</button>
				<button capsMenuRadioItem [checked]="true">Benoit</button>
				<button capsMenuRadioItem>Lewis</button>
				<caps-menu-separator />
				<button capsMenuItem>Edit...</button>
				<caps-menu-separator />
				<button capsMenuItem>Add Profile...</button>
			</caps-menu>
		</ng-template>
	`,
})
export class MenubarPreview {}

export const defaultImports = `
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsMenubarImports } from '@capsule-ng/caps/menubar';
`;

export const defaultSkeleton = `
<caps-menubar>
  <button [capsMenubarTrigger]="file">File</button>
</caps-menubar>

<ng-template #file>
  <caps-menu>
    <button capsMenuItem>
      New Tab
      <caps-menu-shortcut>⌘</caps-menu-shortcut>
    </button>
    <button capsMenuItem>New Window</button>
    <caps-menu-separator />
    <button capsMenuItem>Share</button>
    <caps-menu-separator />
    <button capsMenuItem>Print</button>
  </caps-menu>
</ng-template>
`;
