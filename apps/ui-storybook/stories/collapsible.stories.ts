import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsCollapsible, CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsCollapsible> = {
	title: 'Collapsible',
	component: CapsCollapsible,
	tags: ['autodocs'],
	args: {
		disabled: false,
	},
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [CapsButton, CapsCollapsibleImports],
		}),
	],
};

export default meta;
type Story = StoryObj<CapsCollapsible>;

export const Default: Story = {
	render: ({ ...args }) => ({
		props: args,
		template: `
    <caps-collapsible class="flex flex-col w-[350px] max-w-full space-y-2" ${argsToTemplate(args)}>
      <div class="flex items-center justify-between px-4 space-x-4">
        <h4 class="text-sm font-semibold">
          &#64;peduarte starred 3 repositories
        </h4>
        <button capsCollapsibleTrigger capsButton variant="ghost" size="sm" class="p-0 w-9">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
             <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
             </svg>
            <span class="sr-only">Toggle</span>
          </button>
      </div>
      <div class="px-4 py-3 font-mono text-sm border rounded-md border-border">
        &#64;radix-ui/primitives
      </div>
      <caps-collapsible-content class="space-y-2">
        <div class="px-4 py-3 font-mono text-sm border rounded-md border-border">
          &#64;radix-ui/colors
        </div>
        <div class="px-4 py-3 font-mono text-sm border rounded-md border-border">
          &#64;stitches/react
        </div>
      </caps-collapsible-content>
    </caps-collapsible>
    `,
	}),
};

export const Controlled: Story = {
	render: () => ({
		moduleMetadata: { imports: [ControlledCollapsibleStory] },
		template: `<caps-controlled-collapsible-story />`,
	}),
};
@Component({
	selector: 'caps-controlled-collapsible-story',
	imports: [CapsCollapsibleImports, CapsButton],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-collapsible [(expanded)]="expanded">
			<button capsButton capsCollapsibleTrigger variant="outline">Project details</button>
			<caps-collapsible-content class="py-2">12 documents and 3 members</caps-collapsible-content>
		</caps-collapsible>
		<button capsButton variant="ghost" (click)="expanded.set(!expanded())">Toggle externally</button>
	`,
})
export class ControlledCollapsibleStory {
	public readonly expanded = signal(false);
}
