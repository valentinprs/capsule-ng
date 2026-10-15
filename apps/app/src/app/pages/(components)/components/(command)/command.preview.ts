import { Component } from '@angular/core';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsCommandImports } from '@capsule-ng/caps/command';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideCalculator,
	lucideCalendar,
	lucideCog,
	lucidePlus,
	lucideSearch,
	lucideSmile,
	lucideUser,
	lucideWallet,
} from '@ng-icons/lucide';

@Component({
	selector: 'spartan-command-preview',
	imports: [CapsCommandImports, CapsCardImports, NgIcon],
	providers: [
		provideIcons({
			lucideSearch,
			lucideCalendar,
			lucideSmile,
			lucidePlus,
			lucideUser,
			lucideWallet,
			lucideCog,
			lucideCalculator,
		}),
	],
	host: {
		class: 'w-full py-0',
	},
	template: `
		<caps-card class="py-0">
			<caps-card-content class="p-0">
				<caps-command>
					<caps-command-input placeholder="Type a command or search..." />
					<caps-command-list>
						<caps-command-empty>No results found.</caps-command-empty>
						<caps-command-group label="Suggestions">
							<button capsCommandItem value="Calendar">
								<ng-icon name="lucideCalendar" />
								Calendar
							</button>
							<button capsCommandItem value="Search Emoji">
								<ng-icon name="lucideSmile" />
								Search Emoji
							</button>
							<button capsCommandItem value="Calculator" disabled>
								<ng-icon name="lucideCalculator" />
								Calculator
							</button>
						</caps-command-group>

						<caps-command-separator />

						<caps-command-group label="Settings">
							<button capsCommandItem value="Profile">
								<ng-icon name="lucideUser" />
								Profile
								<caps-command-shortcut>⌘P</caps-command-shortcut>
							</button>
							<button capsCommandItem value="Billing">
								<ng-icon name="lucideWallet" />
								Billing
								<caps-command-shortcut>⌘B</caps-command-shortcut>
							</button>
							<button capsCommandItem value="Settings">
								<ng-icon name="lucideCog" />
								Settings
								<caps-command-shortcut>⌘S</caps-command-shortcut>
							</button>
						</caps-command-group>
					</caps-command-list>
				</caps-command>
			</caps-card-content>
		</caps-card>
	`,
})
export class CommandPreview {}

export const defaultImports = `
import { CapsCommandImports } from '@capsule-ng/caps/command';
`;

export const defaultSkeleton = `
<caps-command>
  <caps-command-input placeholder="Type a command or search..." />
  <caps-command-list>
    <caps-command-empty>No results found.</caps-command-empty>
    <caps-command-group label="Suggestions">
      <button capsCommandItem value="Calendar">
        <ng-icon name="lucideCalendar" />
        Calendar
      </button>
    </caps-command-group>
    <caps-command-separator />
    <caps-command-group label="Settings">
      <button capsCommandItem value="Profile">
        <ng-icon name="lucideUser" />
        Profile
        <caps-command-shortcut>⌘P</caps-command-shortcut>
      </button>
    </caps-command-group>
  </caps-command-list>
</caps-command>
`;
