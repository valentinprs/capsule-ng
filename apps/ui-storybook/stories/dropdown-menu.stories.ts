import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import * as lucide from '@ng-icons/lucide';

import { CapsButton, CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports, CapsMenu } from '@capsule-ng/caps/dropdown-menu';

import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

const meta: Meta<CapsMenu> = {
	title: 'Dropdown Menu',
	component: CapsMenu,
	tags: ['autodocs'],
	args: {
		size: 'lg',
	},
	argTypes: {
		size: {
			options: ['xs', 'sm', 'md', 'lg'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			providers: [provideIcons(lucide)],
			imports: [CapsDropdownMenuImports, CapsButton, NgIcon],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsMenu>;

export const Default: Story = {
	render: ({ ...args }) => ({
		props: args,
		template: `
    <div class='w-full flex justify-center items-center'>
      <button capsButton variant='outline' [capsDropdownMenuTrigger]='menu' placement="bottom-end">Open</button>
    </div>
    <ng-template #menu>
      <caps-menu ${argsToTemplate(args)} class='w-56'>
        <caps-menu-label>My Account</caps-menu-label>
        <caps-menu-separator />
        <caps-menu-group>
          <button capsMenuItem>
            <ng-icon name='lucideUser' />
            <span>Profile</span>
            <caps-menu-shortcut>⇧⌘P</caps-menu-shortcut>
          </button>

          <button capsMenuItem>
            <ng-icon name='lucideCreditCard' />
            <span>Billing</span>
            <caps-menu-shortcut>⌘B</caps-menu-shortcut>
          </button>

          <button capsMenuItem>
            <ng-icon name='lucideSettings' />
            <span>Settings</span>
            <caps-menu-shortcut>⌘S</caps-menu-shortcut>
          </button>

          <button capsMenuItem>
            <ng-icon name='lucideKeyboard' />
            <span>Keyboard Shortcuts</span>
            <caps-menu-shortcut>⌘K</caps-menu-shortcut>
          </button>
        </caps-menu-group>

        <caps-menu-separator />

        <caps-menu-group>
          <button capsMenuItem>
            <ng-icon name='lucideUsers' />
            <span>Team</span>
            <caps-menu-shortcut>⌘B</caps-menu-shortcut>
          </button>

          <button [capsMenuSubTrigger]='invite' side="right" align="start">
            <ng-icon name='lucideUserPlus' />
            <span>Invite Users</span>
          </button>

          <button capsMenuItem>
            <ng-icon name='lucidePlus' />
            <span>New Team</span>
            <caps-menu-shortcut>⌘+T</caps-menu-shortcut>
          </button>
        </caps-menu-group>

        <caps-menu-separator />

        <caps-menu-group>
          <button capsMenuItem [disabled]='false'>
            <ng-icon name='lucideGithub' />
            <span>Github</span>
          </button>

          <button capsMenuItem [disabled]='true'>
            <ng-icon name='lucideLifeBuoy' />
            <span>Support</span>
          </button>

          <button capsMenuItem disabled>
            <ng-icon name='lucideCloud' />
            <span>API</span>
          </button>
        </caps-menu-group>

        <caps-menu-separator />

        <button capsMenuItem>
          <ng-icon name='lucideLogOut' />
          <span>Logout</span>
          <caps-menu-shortcut>⇧⌘Q</caps-menu-shortcut>
        </button>

      </caps-menu>
    </ng-template>

    <ng-template #invite>
      <caps-menu>
        <button capsMenuItem>
          <ng-icon name='lucideMail' />
          Email
        </button>

        <button capsMenuItem>
          <ng-icon name='lucideMessageSquare' />
          Message
        </button>
        <caps-menu-separator />
        <button capsMenuItem>
          <ng-icon name='lucideCirclePlus' />
          <span>More</span>
        </button>
      </caps-menu>
    </ng-template>
    `,
	}),
};

@Component({
	selector: 'stateful-dropdown-story',
	imports: [CapsDropdownMenuImports, CapsButtonImports, NgIcon],
	template: `
		<div class="flex w-full items-center justify-center pt-[20%]">
			<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu" placement="bottom">Open</button>
		</div>
		<ng-template #menu>
			<caps-menu class="w-56">
				<caps-menu-group label="Appearance">
					<button capsMenuCheckboxItem [(checked)]="isPanel">
						<span>Panel</span>
					</button>

					<button capsMenuCheckboxItem disabled [(checked)]="isActivityBar">
						<span>Activity Bar</span>
					</button>

					<button capsMenuCheckboxItem [(checked)]="isStatusBar">
						<span>Status Bar</span>
					</button>
				</caps-menu-group>

				<caps-menu-separator />

				<caps-menu-label>Panel Position</caps-menu-label>

				<caps-menu-group type="radio" [(value)]="selectedPosition">
					@for (size of panelPositions; track size) {
						<button capsMenuRadioItem [value]="size">
							<span>{{ size }}</span>
						</button>
					}
				</caps-menu-group>

				<caps-menu-separator />

				<button capsMenuItem (itemClick)="reset()">
					<ng-icon name="lucideUndo2" />
					Reset
				</button>
			</caps-menu>
		</ng-template>
	`,
})
class StatefulStory {
	isStatusBar = false;
	isPanel = false;
	isActivityBar = false;

	panelPositions = ['Top', 'Bottom', 'Right', 'Left'] as const;
	selectedPosition: string | string[] = 'Bottom';

	reset() {
		this.isStatusBar = false;
		this.isPanel = false;
		this.isActivityBar = false;
		this.selectedPosition = 'Bottom';
	}
}

export const Stateful: Story = {
	render: () => ({
		moduleMetadata: {
			imports: [StatefulStory],
		},
		template: '<stateful-dropdown-story/>',
	}),
};

// Minimal, deterministic submenu layout used by the issue #1333 regression e2e: a sub-trigger with a
// plain sibling item directly below it, so a test can hover/click the sub-trigger and then move to the
// sibling to assert the parent dropdown stays open.
export const Submenu: Story = {
	render: () => ({
		moduleMetadata: {
			imports: [CapsDropdownMenuImports, CapsButton, NgIcon],
			providers: [provideIcons(lucide)],
		},
		template: `
    <div class='flex w-full justify-center pt-[20%]'>
      <button capsButton variant='outline' [capsDropdownMenuTrigger]='menu'>Open</button>
    </div>
    <ng-template #menu>
      <caps-menu class='w-56'>
        <button capsMenuItem>Top Item</button>
        <button [capsMenuSubTrigger]='sub' side='right' align='start'>
          <span>Submenu Trigger</span>
        </button>
        <button capsMenuItem>Bottom Item</button>
      </caps-menu>
    </ng-template>
    <ng-template #sub>
      <caps-menu>
        <button capsMenuItem>Sub Item One</button>
        <button capsMenuItem>Sub Item Two</button>
      </caps-menu>
    </ng-template>
    `,
	}),
};
