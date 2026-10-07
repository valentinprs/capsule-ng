import { NgIcon } from '@ng-icons/core';

import { CapsButton } from '@capsule-ng/caps/button';
import { CapsContextMenuImports } from '@capsule-ng/caps/context-menu';
import { CapsMenu } from '@capsule-ng/caps/dropdown-menu';

import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

const meta: Meta<CapsMenu> = {
	title: 'Context Menu',
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
			imports: [CapsContextMenuImports, CapsButton, NgIcon],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsMenu>;

export const Default: Story = {
	render: ({ ...args }) => ({
		props: args,
		template: `
        <div [capsContextMenuTrigger]='menu'
         class='border-border flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm' tabindex="0">
      Right click here
    </div>

    <ng-template #menu>
      <caps-menu ${argsToTemplate(args)} class='w-64'>
        <caps-menu-group>
          <button capsMenuItem>
            Back
            <caps-menu-shortcut>⌘[</caps-menu-shortcut>
          </button>

          <button disabled capsMenuItem>
            Forward
            <caps-menu-shortcut>⌘]</caps-menu-shortcut>
          </button>

          <button disabled capsMenuItem>
            Reload
            <caps-menu-shortcut>⌘R</caps-menu-shortcut>
          </button>

          <button inset [capsMenuSubTrigger]='moreTools'>
            More Tools
          </button>
        </caps-menu-group>

        <caps-menu-separator />

        <caps-menu-group>
          <button capsMenuCheckboxItem [checked]="true">
            Show Bookmarks Bar
            <caps-menu-shortcut>⌘⇧B</caps-menu-shortcut>
          </button>
          <button capsMenuCheckboxItem>
            Show full URLs
          </button>
        </caps-menu-group>

        <caps-menu-separator />
        <caps-menu-label>People</caps-menu-label>
        <caps-menu-separator />
        <caps-menu-group>
          <button capsMenuRadioItem [checked]="true">
            Pedro Duarte
          </button>
          <button capsMenuRadioItem>
            Colm Tuite
          </button>
        </caps-menu-group>
      </caps-menu>
    </ng-template>

    <ng-template #moreTools>
      <caps-menu class='w-48'>
        <button capsMenuItem>
          Save Page as...
          <caps-menu-shortcut>⇧⌘S</caps-menu-shortcut>
        </button>
        <button capsMenuItem>
          Create Shortcut...
        </button>
        <button capsMenuItem>
          Name Window...
        </button>
        <caps-menu-separator />
        <button capsMenuItem>Developer Tools</button>
      </caps-menu>
    </ng-template>
    `,
	}),
};
