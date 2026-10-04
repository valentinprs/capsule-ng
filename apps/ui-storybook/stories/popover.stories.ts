import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon } from '@ng-icons/core';

import { CapsInput } from '@capsule-ng/caps/input';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsPopover, CapsPopoverImports, type CapsPlacement } from '@capsule-ng/caps/popover';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

const meta: Meta<CapsPopover & { placement: CapsPlacement; autoAlign: boolean }> = {
	title: 'Popover',
	component: CapsPopover,
	tags: ['autodocs'],
	args: {
		placement: 'bottom',
	},
	argTypes: {
		placement: {
			control: 'select',
			options: [
				'top',
				'top-start',
				'top-end',
				'bottom',
				'bottom-start',
				'bottom-end',
				'left',
				'left-start',
				'left-end',
				'right',
				'right-start',
				'right-end',
			],
		},
	},
	decorators: [
		moduleMetadata({
			imports: [CapsPopoverImports, CapsButton, CapsLabel, CapsInput, NgIcon],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsPopover & { placement: CapsPlacement; autoAlign: boolean }>;

export const Default: Story = {
	render: ({ ...args }) => ({
		props: { ...args, outsideClicks: 0 },
		template: `
	    <caps-popover ${argsToTemplate(args)}>
	    <div class='flex flex-col items-center justify-center gap-4 py-80'>
	        <div class='flex items-center gap-4'>
	            <button id='edit-profile' variant='outline' capsPopoverTrigger capsButton>Open Popover</button>
	            <button id='outside-action' variant='outline' capsButton (click)='outsideClicks = outsideClicks + 1'>Outside Action</button>
	        </div>
	        <p id='outside-click-count'>Outside clicks: {{ outsideClicks }}</p>
	    </div>
    <ng-template capsPopoverContent let-ctx [class]="'w-80 grid gap-4'">
          <div class='space-y-2'>
            <h4 class='font-medium leading-none'>Dimensions</h4>
            <p class='text-sm text-muted-foreground'>
              Set the dimensions for the layer.
            </p>
          </div>
          <div class='grid gap-2'>
            <div class='items-center grid grid-cols-3 gap-4'>
              <label capsLabel for='width'>Width</label>
              <input capsInput
                id='width'
                [defaultValue]="'100%'"
                class='h-8 col-span-2'
              />
            </div>
            <div class='items-center grid grid-cols-3 gap-4'>
              <label capsLabel for='maxWidth'>Max. width</label>
              <input capsInput
                id='maxWidth'
                [defaultValue]="'300px'"
                class='h-8 col-span-2'
              />
            </div>
            <div class='items-center grid grid-cols-3 gap-4'>
              <label capsLabel for='height'>Height</label>
              <input capsInput
                id='height'
                [defaultValue]="'25px'"
                class='h-8 col-span-2'
              />
            </div>
            <div class='items-center grid grid-cols-3 gap-4'>
              <label capsLabel for='maxHeight'>Max. height</label>
              <input capsInput
                id='maxHeight'
                [defaultValue]="'none'"
                class='h-8 col-span-2'
              />
            </div>
          </div>
      </ng-template>
    </caps-popover>
    `,
	}),
};

/**
 * Trigger pinned to the right edge with content wider than itself, inside a page tall
 * enough to scroll. Covers both positioning cases: the overlay has to be shifted back
 * into the viewport when it opens, and it has to keep following its trigger afterwards.
 */
export const NearViewportEdge: Story = {
	args: {
		placement: 'bottom-start',
		autoAlign: true,
	},
	render: ({ ...args }) => ({
		props: { ...args },
		template: `
    <caps-popover ${argsToTemplate(args)}>
      <div class='flex justify-end py-[900px]'>
        <button id='edge-trigger' variant='outline' capsPopoverTrigger capsButton>Edge</button>
      </div>
      <ng-template capsPopoverContent let-ctx [class]="'w-80'">
        <p id='edge-content' class='text-sm'>Content wider than its trigger.</p>
      </ng-template>
    </caps-popover>
    `,
	}),
};

/** Close on native document scrolling through the public controlled open state. */
export const CloseOnScroll: Story = {
	render: ({ ...args }) => ({
		props: { ...args, scrollOpen: false },
		template: `
    <div (document:scroll)='scrollOpen = false'></div>
    <caps-popover ${argsToTemplate(args)} [open]='scrollOpen' (openChange)='scrollOpen = $event'>
      <div class='flex justify-center py-[900px]'>
        <button id='closing-trigger' variant='outline' capsPopoverTrigger capsButton>Closes on scroll</button>
      </div>
      <ng-template capsPopoverContent let-ctx [class]="'w-80'">
        <p id='closing-content' class='text-sm'>Dismissed as soon as the page scrolls.</p>
      </ng-template>
    </caps-popover>
    `,
	}),
};
