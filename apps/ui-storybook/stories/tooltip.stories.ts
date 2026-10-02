import { Component, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { HlmTooltip } from '@spartan-ng/helm/tooltip';
import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

const meta: Meta<HlmTooltip> = {
	title: 'Tooltip',
	component: HlmTooltip,
	tags: ['autodocs'],
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [CapsButton, HlmTooltip, NgIcon],
			providers: [provideIcons({ lucidePlus })],
		}),
	],
};

export default meta;
type Story = StoryObj<HlmTooltip>;
export const Default: Story = {
	argTypes: {
		position: {
			control: { type: 'radio' },
			options: ['top', 'left', 'right', 'bottom'],
			defaultValue: 'top',
		},
	},
	render: ({ ...args }) => ({
		props: args,
		template: `
<div class='p-40'>
  <hlm-tooltip>
    <button [hlmTooltip]="tooltip" ${argsToTemplate(args)}  capsButton variant='outline'>Test</button>
    <ng-template #tooltip>

    <span class='flex items-center'>
      Add to library <ng-icon  class='ml-2'  name='lucidePlus'/>
     </span>
</ng-template>
  </hlm-tooltip>
</div>
`,
	}),
};

@Component({
	selector: 'simple-tooltip-story',
	imports: [CapsButton, HlmTooltip, NgIcon],
	providers: [provideIcons({ lucidePlus })],
	template: `
		<div class="p-40">
			<button
				(click)="_disabled.set(!_disabled())"
				[hlmTooltip]="'Add to library'"
				[tooltipDisabled]="_disabled()"
				capsButton
				size="icon"
			>
				<ng-icon name="lucidePlus" />
			</button>
		</div>
	`,
})
class SimpleTooltip {
	protected readonly _disabled = signal(false);
}

export const Simple: Story = {
	render: () => ({
		moduleMetadata: {
			imports: [SimpleTooltip],
		},
		template: '<simple-tooltip-story/>',
	}),
};

@Component({
	selector: 'disabled-tooltip-story',
	imports: [CapsButton, HlmTooltip, NgIcon],
	providers: [provideIcons({ lucidePlus })],
	template: `
		<div class="p-40">
			<button
				(click)="_disabled.set(!_disabled())"
				[hlmTooltip]="tooltip"
				[tooltipDisabled]="_disabled()"
				capsButton
				variant="outline"
			>
				Test
			</button>
			<ng-template #tooltip>
				<span class="flex items-center">
					Add to library
					<ng-icon class="ml-2" name="lucidePlus" />
				</span>
			</ng-template>

			<p>{{ _disabled() ? 'disabled' : 'enabled' }}</p>
		</div>
	`,
})
class DisabledTooltip {
	protected readonly _disabled = signal(false);
}

export const Disabled: Story = {
	render: () => ({
		moduleMetadata: {
			imports: [DisabledTooltip],
		},
		template: '<disabled-tooltip-story/>',
	}),
};
