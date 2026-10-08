import { Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCommandImports } from '@capsule-ng/caps/command';

@Component({
	selector: 'spartan-command-basic',
	imports: [CapsCommandImports, CapsButtonImports],
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
						<button capsCommandItem value="calendar" (selected)="commandSelected('calendar')">Calendar</button>
						<button capsCommandItem value="emoji" (selected)="commandSelected('emoji')">Search Emoji</button>
						<button capsCommandItem value="calculator" (selected)="commandSelected('calculator')">Calculator</button>
					</caps-command-group>
				</caps-command-list>
			</caps-command>
		</caps-command-dialog>
	`,
})
export class CommandBasic {
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
