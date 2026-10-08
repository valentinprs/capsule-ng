import { Component, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsCommandImports } from '@capsule-ng/caps/command';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideCalendar,
	lucideCog,
	lucideLayers,
	lucidePlus,
	lucideSearch,
	lucideSmile,
	lucideUser,
	lucideX,
} from '@ng-icons/lucide';

@Component({
	selector: 'spartan-command-shortcuts',
	imports: [CapsCommandImports, CapsButton, NgIcon],
	providers: [
		provideIcons({
			lucideX,
			lucideCalendar,
			lucideSmile,
			lucidePlus,
			lucideUser,
			lucideLayers,
			lucideCog,
			lucideSearch,
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
					<caps-command-group label="Settings">
						<button capsCommandItem value="profile" (selected)="commandSelected('profile')">
							<ng-icon name="lucideUser" />
							Profile
							<caps-command-shortcut>⌘P</caps-command-shortcut>
						</button>
						<button capsCommandItem value="billing" (selected)="commandSelected('billing')">
							<ng-icon name="lucideLayers" />
							Billing
							<caps-command-shortcut>⌘B</caps-command-shortcut>
						</button>
						<button capsCommandItem value="settings" (selected)="commandSelected('settings')">
							<ng-icon name="lucideCog" />
							Settings
							<caps-command-shortcut>⌘S</caps-command-shortcut>
						</button>
					</caps-command-group>
				</caps-command-list>
			</caps-command>
		</caps-command-dialog>
	`,
})
export class CommandShortcuts {
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
