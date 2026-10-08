import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsCommand, CapsCommandImports } from '@capsule-ng/caps/command';
import { NgIcon, provideIcons } from '@ng-icons/core';
import * as lucide from '@ng-icons/lucide';

import { HlmCode } from '@spartan-ng/helm/typography';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsCommand> = {
	title: 'Command',
	component: CapsCommand,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			providers: [provideIcons(lucide)],
			imports: [CapsCommandImports, NgIcon, CapsButton],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsCommand>;

export const Default: Story = {
	render: () => ({
		template: `
		<caps-command>
			<caps-command-input placeholder="Type a command or search..." />
  <caps-command-list>
    <caps-command-group label="Suggestions">

      <button capsCommandItem value="Calendar">
        <ng-icon name="lucideCalendar" />
        Calendar
      </button>
      <button disabled capsCommandItem value="Search Emoji">
        <ng-icon name="lucideSmile" />
        Search Emoji
      </button>
      <button capsCommandItem value="Calculator">
        <ng-icon name="lucidePlus" />
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

  <!-- Empty state -->
  <caps-command-empty>No results found.</caps-command-empty>
</caps-command>

    `,
	}),
};

@Component({
	selector: 'command-dialog-component',
	imports: [CapsCommandImports, HlmCode, NgIcon],
	host: {
		'(window:keydown)': 'onKeyDown($event)',
	},
	template: `
		<div class="mx-auto flex max-w-screen-sm items-center justify-center space-x-4 py-20 text-sm">
			<p>
				Press
				<code hlmCode>⌘ + K</code>
			</p>
			<p>
				Last command:
				<code data-testid="lastCommand" hlmCode>{{ command() || 'none' }}</code>
			</p>
		</div>
		<caps-command-dialog [(open)]="state">
			<caps-command>
				<caps-command-input placeholder="Type a command or search..." />
				<caps-command-list>
					<caps-command-group label="Suggestions">
						<button capsCommandItem value="Calendar" (selected)="commandSelected('Calendar')">
							<ng-icon name="lucideCalendar" />
							Calendar
						</button>
						<button capsCommandItem disabled value="Search Emoji" (selected)="commandSelected('Search Emoji')">
							<ng-icon name="lucideSmile" />
							Search Emoji
						</button>
						<button capsCommandItem value="Calculator" (selected)="commandSelected('Calculator')">
							<ng-icon name="lucidePlus" />
							Calculator
						</button>
					</caps-command-group>

					<caps-command-separator />

					<caps-command-group label="Settings">
						<button capsCommandItem value="Profile" (selected)="commandSelected('Profile')">
							<ng-icon name="lucideUser" />
							Profile
							<caps-command-shortcut>⌘P</caps-command-shortcut>
						</button>
						<button capsCommandItem value="Billing" (selected)="commandSelected('Billing')">
							<ng-icon name="lucideWallet" />
							Billing
							<caps-command-shortcut>⌘B</caps-command-shortcut>
						</button>
						<button capsCommandItem value="Settings" (selected)="commandSelected('Settings')">
							<ng-icon name="lucideCog" />
							Settings
							<caps-command-shortcut>⌘S</caps-command-shortcut>
						</button>
					</caps-command-group>
				</caps-command-list>

				<!-- Empty state -->
				<caps-command-empty>No results found.</caps-command-empty>
			</caps-command>
		</caps-command-dialog>
	`,
})
class CommandDialog {
	public command = signal('');
	public state = signal(false);

	onKeyDown(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
			if (
				event.target instanceof HTMLElement &&
				(event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))
			)
				return;
			event.preventDefault();
			this.state.set(true);
		}
	}

	stateChanged(state: boolean) {
		this.state.set(state);
	}

	commandSelected(selected: string) {
		this.state.set(false);
		this.command.set(selected);
	}
}

export const Dialog: Story = {
	decorators: [
		moduleMetadata({
			imports: [CommandDialog],
		}),
	],
	render: () => ({
		template: '<command-dialog-component/>',
	}),
};

@Component({
	selector: 'command-dynamic-component',
	imports: [CapsCommandImports, NgIcon, FormsModule],
	template: `
		<caps-command [search]="_search()">
			<caps-command-input placeholder="Type a command or search..." />
			<caps-command-list>
				<caps-command-group label="Suggestions">
					@for (item of _items(); track item.value) {
						<button capsCommandItem [value]="item.value" data-testid="command-item">
							<ng-icon [name]="item.icon" />
							{{ item.label }}
						</button>
					}
				</caps-command-group>
			</caps-command-list>

			<!-- Empty state -->
			<caps-command-empty>No results found.</caps-command-empty>
		</caps-command>
	`,
})
class CommandDynamic {
	protected readonly _search = signal('P');
	protected readonly _items = signal<{ label: string; value: string; icon: string; shortcut: string }[]>([
		{ label: 'Profile', value: 'Profile', icon: 'lucideUser', shortcut: '⌘P' },
		{ label: 'Billing', value: 'Billing', icon: 'lucideWallet', shortcut: '⌘B' },
		{ label: 'Search Emoji', value: 'Search Emoji', icon: 'lucideSmile', shortcut: '⌘E' },
		{ label: 'Settings', value: 'Settings', icon: 'lucideCog', shortcut: '⌘S' },
	]);
}

export const DynamicOptions: Story = {
	decorators: [
		moduleMetadata({
			imports: [CommandDynamic],
		}),
	],
	render: () => ({
		template: '<command-dynamic-component/>',
	}),
};

@Component({
	selector: 'command-reactive-form-component',
	imports: [CapsCommandImports, NgIcon, FormsModule, ReactiveFormsModule],
	template: `
		<caps-command [formControl]="searchControl">
			<caps-command-input placeholder="Type a command or search..." />
			<caps-command-list>
				<caps-command-group label="Suggestions">
					@for (item of _items(); track item.value) {
						<button capsCommandItem [value]="item.value" data-testid="command-item">
							<ng-icon [name]="item.icon" />
							{{ item.label }}
						</button>
					}
				</caps-command-group>
			</caps-command-list>

			<!-- Empty state -->
			<caps-command-empty>No results found.</caps-command-empty>
		</caps-command>
	`,
})
class CommandReactiveForm {
	public readonly searchControl = new FormControl('R');
	protected readonly _items = signal<{ label: string; value: string; icon: string; shortcut: string }[]>([
		{ label: 'Profile', value: 'Profile', icon: 'lucideUser', shortcut: '⌘P' },
		{ label: 'Billing', value: 'Billing', icon: 'lucideWallet', shortcut: '⌘B' },
		{ label: 'Search Emoji', value: 'Search Emoji', icon: 'lucideSmile', shortcut: '⌘E' },
		{ label: 'Settings', value: 'Settings', icon: 'lucideCog', shortcut: '⌘S' },
	]);
	public state = signal(false);
}

export const ReactiveForm: Story = {
	decorators: [
		moduleMetadata({
			imports: [CommandReactiveForm],
		}),
	],
	render: () => ({
		template: '<command-reactive-form-component/>',
	}),
};

@Component({
	selector: 'command-bound-value-component',
	imports: [CapsCommandImports, NgIcon],
	template: `
		<caps-command [search]="_search()">
			<caps-command-input placeholder="Type a command or search..." />
			<caps-command-list>
				<caps-command-group label="Suggestions">
					@for (item of _items(); track item.value) {
						<button capsCommandItem [value]="item.value" data-testid="command-item">
							<ng-icon [name]="item.icon" />
							{{ item.label }}
						</button>
					}
				</caps-command-group>
			</caps-command-list>

			<!-- Empty state -->
			<caps-command-empty>No results found.</caps-command-empty>
		</caps-command>
	`,
})
class CommandBoundValue {
	protected readonly _search = signal('S');
	protected readonly _items = signal<{ label: string; value: string; icon: string; shortcut: string }[]>([
		{ label: 'Profile', value: 'Profile', icon: 'lucideUser', shortcut: '⌘P' },
		{ label: 'Billing', value: 'Billing', icon: 'lucideWallet', shortcut: '⌘B' },
		{ label: 'Search Emoji', value: 'Search Emoji', icon: 'lucideSmile', shortcut: '⌘E' },
		{ label: 'Settings', value: 'Settings', icon: 'lucideCog', shortcut: '⌘S' },
	]);
}

export const BoundValue: Story = {
	decorators: [
		moduleMetadata({
			imports: [CommandBoundValue],
		}),
	],
	render: () => ({
		template: '<command-bound-value-component/>',
	}),
};
