import { Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsResizableImports } from '@capsule-ng/caps/resizable';
import type { Meta, StoryObj } from '@storybook/angular';
import { componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'resizable-example',
	imports: [CapsResizableImports, CapsButtonImports],
	template: `
		<caps-resizable-group class="h-[200px] w-full max-w-md rounded-lg border">
			<caps-resizable-panel>
				<div class="flex h-full items-center justify-center p-6">One</div>
			</caps-resizable-panel>
			<caps-resizable-handle aria-label="One width" />
			<caps-resizable-panel>
				<caps-resizable-group direction="vertical">
					<caps-resizable-panel>
						<div class="flex h-full items-center justify-center p-6">
							<span class="font-semibold">Two</span>
						</div>
					</caps-resizable-panel>
					<caps-resizable-handle aria-label="Two height" />
					<caps-resizable-panel>
						<div class="flex h-full items-center justify-center p-6">
							<span class="font-semibold">Three</span>
						</div>
					</caps-resizable-panel>
				</caps-resizable-group>
			</caps-resizable-panel>
		</caps-resizable-group>
	`,
})
class ResizableExample {}

@Component({
	selector: 'resizable-dynamic-panels-example',
	imports: [CapsResizableImports, CapsButtonImports],
	template: `
		<div class="flex flex-col gap-4">
			<div class="flex items-center gap-4">
				<button type="button" capsButton variant="outline" (click)="_showExtra.update((value) => !value)">
					{{ _showExtra() ? 'Remove' : 'Add' }} extra panel
				</button>
				<span class="text-muted-foreground text-sm tabular-nums">Layout: {{ _layout().join(', ') }}</span>
			</div>

			<caps-resizable-group
				direction="vertical"
				class="h-[360px] w-full max-w-md rounded-lg border"
				[(layout)]="_layout"
			>
				<caps-resizable-panel [defaultSize]="25">
					<div class="flex h-full items-center justify-center p-6 font-semibold">Header</div>
				</caps-resizable-panel>
				<caps-resizable-handle aria-label="Header height" withHandle />
				<caps-resizable-panel [defaultSize]="75">
					<div class="flex h-full items-center justify-center p-6 font-semibold">Content</div>
				</caps-resizable-panel>
				@if (_showExtra()) {
					<caps-resizable-handle aria-label="Content height" withHandle />
					<caps-resizable-panel [defaultSize]="25">
						<div class="flex h-full items-center justify-center p-6 font-semibold">Extra Dynamic Panel</div>
					</caps-resizable-panel>
				}
			</caps-resizable-group>
		</div>
	`,
})
class ResizableDynamicPanelsExample {
	protected readonly _showExtra = signal(false);
	protected readonly _layout = signal<number[]>([]);
}

export default {
	title: 'Resizable',
	component: ResizableExample,
	tags: ['autodocs'],
	decorators: [
		componentWrapperDecorator((story) => `<main><h1 class="sr-only">Resizable example</h1>${story}</main>`),
		moduleMetadata({
			imports: [CapsResizableImports, ResizableDynamicPanelsExample],
		}),
	],
} as Meta<ResizableExample>;

type Story = StoryObj<ResizableExample>;

export const Default: Story = {
	render: () => ({
		template: `
<resizable-example></resizable-example>
		`,
	}),
};

export const DynamicPanels: Story = {
	render: () => ({
		template: `
<resizable-dynamic-panels-example></resizable-dynamic-panels-example>
		`,
	}),
};

export const Bounded: Story = {
	render: () => ({
		template: `<caps-resizable-group class="h-48 w-full max-w-md border" aria-label="Bounded panels">
 <caps-resizable-panel defaultSize="30" minSize="20" maxSize="50" [collapsible]="false">Navigation</caps-resizable-panel>
 <caps-resizable-handle aria-label="Navigation width" withHandle />
 <caps-resizable-panel defaultSize="70" minSize="50" maxSize="80" [collapsible]="false">Content</caps-resizable-panel>
 </caps-resizable-group>`,
	}),
};
export const Disabled: Story = {
	render: () => ({
		template: `<caps-resizable-group class="h-48 w-full max-w-md border" aria-label="Fixed panels">
 <caps-resizable-panel defaultSize="30">Navigation</caps-resizable-panel>
 <caps-resizable-handle aria-label="Navigation width" disabled withHandle />
 <caps-resizable-panel defaultSize="70">Content</caps-resizable-panel>
 </caps-resizable-group>`,
	}),
};
