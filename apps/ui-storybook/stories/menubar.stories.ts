import { NgIcon } from '@ng-icons/core';

import { CapsButton } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';

import { CapsMenubar, CapsMenubarImports } from '@capsule-ng/caps/menubar';
import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

const meta: Meta<CapsMenubar> = {
	title: 'Menubar',
	component: CapsMenubar,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsMenubarImports, CapsDropdownMenuImports, CapsButton, NgIcon],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsMenubar>;

export const Default: Story = {
	render: ({ ...args }) => ({
		props: args,
		template: `
    <caps-menubar >
      <button [capsMenubarTrigger]='file'>File</button>
      <button [capsMenubarTrigger]='edit'>Edit</button>
      <button [capsMenubarTrigger]='view'>View</button>
      <button [capsMenubarTrigger]='profiles'>Profiles</button>
    </caps-menubar>

    <ng-template #file>
      <caps-menu ${argsToTemplate(args)} class='w-48'>
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

        <button [capsMenuSubTrigger]='share'>
          Share
        </button>

        <caps-menu-separator />

        <button capsMenuItem>
          Print...
          <caps-menu-shortcut>⌘P</caps-menu-shortcut>
        </button>

      </caps-menu>
    </ng-template>
    <ng-template #share>
      <caps-menu>
        <button capsMenuItem>
          Email link
        </button>
        <button capsMenuItem>
          Messages
        </button>
        <button capsMenuItem>
          Notes
        </button>
      </caps-menu>
    </ng-template>

    <ng-template #edit>
      <caps-menu ${argsToTemplate(args)} class='w-48'>
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

        <button [capsMenuSubTrigger]='share'>
          Share
        </button>

        <caps-menu-separator />

        <button capsMenuItem>Cut</button>
        <button capsMenuItem>Copy</button>
        <button capsMenuItem>Paste</button>

      </caps-menu>
    </ng-template>
    <ng-template #share>
      <caps-menu>
        <button capsMenuItem>
          Search the web
        </button>
        <caps-menu-separator />
        <button capsMenuItem>
          Find...
        </button>
        <button capsMenuItem>
          Find Next
        </button>
        <button capsMenuItem>
          Find Previous
        </button>
      </caps-menu>
    </ng-template>

    <ng-template #view>
      <caps-menu ${argsToTemplate(args)}>
        <button capsMenuCheckboxItem>
          Always Show Bookmarks Bar
        </button>
        <button capsMenuCheckboxItem [checked]="true">
          Always Show Full URLs
        </button>
        <caps-menu-separator />
        <button capsMenuItem>
          Reload
          <caps-menu-shortcut>⌘R</caps-menu-shortcut>
        </button>
        <button disabled capsMenuItem>
          Force Reload
          <caps-menu-shortcut>⇧⌘R</caps-menu-shortcut>
        </button>
        <caps-menu-separator />
        <button capsMenuItem>
          Toggle Fullscreen
        </button>
        <caps-menu-separator />
        <button capsMenuItem>
          Hide Sidebar
        </button>
      </caps-menu>
    </ng-template>

    <ng-template #profiles>
      <caps-menu ${argsToTemplate(args)} class='w-48'>
        <button capsMenuRadioItem>
          Andy
        </button>
        <button capsMenuRadioItem [checked]="true">
          Benoit
        </button>
        <button capsMenuRadioItem>
          Lewis
        </button>
        <caps-menu-separator />
        <button capsMenuItem>
          Edit...
        </button>
        <caps-menu-separator />
        <button capsMenuItem>
          Add Profile...
        </button>
      </caps-menu>
    </ng-template>
    `,
	}),
};
