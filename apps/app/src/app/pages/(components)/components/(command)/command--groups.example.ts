import { Component, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsCommandImports } from '@capsule-ng/caps/command';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar, lucideCog, lucideLayers, lucidePlus, lucideSmile, lucideUser } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-command-groups',
	imports: [CapsCommandImports, CapsButton, NgIcon],
	providers: [
		provideIcons({
			lucideCalendar,
			lucideSmile,
			lucidePlus,
			lucideUser,
			lucideLayers,
			lucideCog,
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
					<caps-command-group label="Suggestions">
						<button capsCommandItem value="calendar" (selected)="commandSelected('calendar')">
							<ng-icon name="lucideCalendar" />
							Calendar
						</button>
						<button capsCommandItem value="emojy" (selected)="commandSelected('emojy')">
							<ng-icon name="lucideSmile" />
							Search Emoji
						</button>
						<button capsCommandItem value="calculator" (selected)="commandSelected('calculator')">
							<ng-icon name="lucidePlus" />
							Calculator
						</button>
					</caps-command-group>
					<caps-command-separator />
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
export class CommandGroups {
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
