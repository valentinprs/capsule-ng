import { Component, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsCommandImports } from '@capsule-ng/caps/command';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideBell,
	lucideCalculator,
	lucideCalendar,
	lucideCircleHelp,
	lucideClipboardPaste,
	lucideCode,
	lucideCog,
	lucideCopy,
	lucideCreditCard,
	lucideFileText,
	lucideFolder,
	lucideFolderPlus,
	lucideHouse,
	lucideImage,
	lucideInbox,
	lucideLayoutGrid,
	lucideList,
	lucidePlus,
	lucideScissors,
	lucideTrash2,
	lucideUser,
	lucideZoomIn,
	lucideZoomOut,
} from '@ng-icons/lucide';

@Component({
	selector: 'spartan-command-scrollable',
	imports: [CapsCommandImports, CapsButton, NgIcon],
	providers: [
		provideIcons({
			lucideHouse,
			lucideInbox,
			lucideFileText,
			lucideFolder,
			lucidePlus,
			lucideFolderPlus,
			lucideCopy,
			lucideScissors,
			lucideClipboardPaste,
			lucideTrash2,
			lucideLayoutGrid,
			lucideList,
			lucideZoomIn,
			lucideZoomOut,
			lucideUser,
			lucideCreditCard,
			lucideCog,
			lucideBell,
			lucideCircleHelp,
			lucideCalculator,
			lucideCalendar,
			lucideImage,
			lucideCode,
		}),
	],

	template: `
		<div class="mx-auto flex max-w-screen-sm items-center justify-center space-x-4 py-20 text-sm">
			<button capsButton variant="outline" (click)="stateChanged(true)">Open Menu</button>
		</div>
		<caps-command-dialog [(open)]="state">
			<caps-command>
				<caps-command-input placeholder="Type a command or search..." />

				<caps-command-list>
					<caps-command-empty>No results found.</caps-command-empty>

					<!-- Navigation -->
					<caps-command-group label="Navigation">
						<button capsCommandItem value="home" (selected)="commandSelected('home')">
							<ng-icon name="lucideHouse" />
							Home
							<caps-command-shortcut>⌘H</caps-command-shortcut>
						</button>

						<button capsCommandItem value="inbox" (selected)="commandSelected('inbox')">
							<ng-icon name="lucideInbox" />
							Inbox
							<caps-command-shortcut>⌘I</caps-command-shortcut>
						</button>

						<button capsCommandItem value="documents" (selected)="commandSelected('documents')">
							<ng-icon name="lucideFileText" />
							Documents
							<caps-command-shortcut>⌘D</caps-command-shortcut>
						</button>

						<button capsCommandItem value="folders" (selected)="commandSelected('folders')">
							<ng-icon name="lucideFolder" />
							Folders
							<caps-command-shortcut>⌘F</caps-command-shortcut>
						</button>
					</caps-command-group>

					<caps-command-separator />

					<!-- Actions -->
					<caps-command-group label="Actions">
						<button capsCommandItem value="new-file" (selected)="commandSelected('new-file')">
							<ng-icon name="lucidePlus" />
							New File
							<caps-command-shortcut>⌘N</caps-command-shortcut>
						</button>

						<button capsCommandItem value="new-folder" (selected)="commandSelected('new-folder')">
							<ng-icon name="lucideFolderPlus" />
							New Folder
							<caps-command-shortcut>⇧⌘N</caps-command-shortcut>
						</button>

						<button capsCommandItem value="copy" (selected)="commandSelected('copy')">
							<ng-icon name="lucideCopy" />
							Copy
							<caps-command-shortcut>⌘C</caps-command-shortcut>
						</button>

						<button capsCommandItem value="cut" (selected)="commandSelected('cut')">
							<ng-icon name="lucideScissors" />
							Cut
							<caps-command-shortcut>⌘X</caps-command-shortcut>
						</button>

						<button capsCommandItem value="paste" (selected)="commandSelected('paste')">
							<ng-icon name="lucideClipboardPaste" />
							Paste
							<caps-command-shortcut>⌘V</caps-command-shortcut>
						</button>

						<button capsCommandItem value="delete" (selected)="commandSelected('delete')">
							<ng-icon name="lucideTrash2" />
							Delete
							<caps-command-shortcut>⌫</caps-command-shortcut>
						</button>
					</caps-command-group>

					<caps-command-separator />

					<!-- View -->
					<caps-command-group label="View">
						<button capsCommandItem value="grid-view" (selected)="commandSelected('grid-view')">
							<ng-icon name="lucideLayoutGrid" />
							Grid View
						</button>

						<button capsCommandItem value="list-view" (selected)="commandSelected('list-view')">
							<ng-icon name="lucideList" />
							List View
						</button>

						<button capsCommandItem value="zoom-in" (selected)="commandSelected('zoom-in')">
							<ng-icon name="lucideZoomIn" />
							Zoom In
							<caps-command-shortcut>⌘+</caps-command-shortcut>
						</button>

						<button capsCommandItem value="zoom-out" (selected)="commandSelected('zoom-out')">
							<ng-icon name="lucideZoomOut" />
							Zoom Out
							<caps-command-shortcut>⌘-</caps-command-shortcut>
						</button>
					</caps-command-group>

					<caps-command-separator />

					<!-- Account -->
					<caps-command-group label="Account">
						<button capsCommandItem value="profile" (selected)="commandSelected('profile')">
							<ng-icon name="lucideUser" />
							Profile
							<caps-command-shortcut>⌘P</caps-command-shortcut>
						</button>

						<button capsCommandItem value="billing" (selected)="commandSelected('billing')">
							<ng-icon name="lucideCreditCard" />
							Billing
							<caps-command-shortcut>⌘B</caps-command-shortcut>
						</button>

						<button capsCommandItem value="settings" (selected)="commandSelected('settings')">
							<ng-icon name="lucideCog" />
							Settings
							<caps-command-shortcut>⌘S</caps-command-shortcut>
						</button>

						<button capsCommandItem value="notifications" (selected)="commandSelected('notifications')">
							<ng-icon name="lucideBell" />
							Notifications
						</button>

						<button capsCommandItem value="help" (selected)="commandSelected('help')">
							<ng-icon name="lucideCircleHelp" />
							Help & Support
						</button>
					</caps-command-group>

					<caps-command-separator />

					<!-- Tools -->
					<caps-command-group label="Tools">
						<button capsCommandItem value="calculator" (selected)="commandSelected('calculator')">
							<ng-icon name="lucideCalculator" />
							Calculator
						</button>

						<button capsCommandItem value="calendar" (selected)="commandSelected('calendar')">
							<ng-icon name="lucideCalendar" />
							Calendar
						</button>

						<button capsCommandItem value="image-editor" (selected)="commandSelected('image-editor')">
							<ng-icon name="lucideImage" />
							Image Editor
						</button>

						<button capsCommandItem value="code-editor" (selected)="commandSelected('code-editor')">
							<ng-icon name="lucideCode" />
							Code Editor
						</button>
					</caps-command-group>
				</caps-command-list>
			</caps-command>
		</caps-command-dialog>
	`,
})
export class CommandScrollable {
	public readonly command = signal('');
	public readonly state = signal(false);

	stateChanged(state: boolean) {
		this.state.set(state);
	}

	commandSelected(selected: string) {
		this.state.set(false);
		this.command.set(selected);
	}
}
