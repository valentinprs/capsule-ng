import { Component } from '@angular/core';
import { CapsScrollArea, CapsScrollAreaImports } from '@capsule-ng/caps/scroll-area';
import { CapsSeparatorImports } from '@capsule-ng/caps/separator';
import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'scroll-area-stories',
	imports: [CapsSeparatorImports, CapsScrollAreaImports],
	template: `
		<caps-scroll-area orientation="vertical" aria-label="Release tags" class="h-72 w-48 rounded-md border">
			<div class="p-4">
				<h2 class="mb-4 text-sm font-medium">Tags</h2>
				@for (tag of tags; track tag) {
					<div class="text-sm">
						{{ tag }}
						<caps-separator class="my-2" />
					</div>
				}
			</div>
		</caps-scroll-area>
	`,
})
class ScrollAreaStories {
	public readonly tags = Array.from({ length: 50 }, (_, i) => `v1.2.0-beta.${50 - i}`);
}
const meta: Meta<CapsScrollArea> = {
	title: 'Scroll Area',
	component: CapsScrollArea,
	tags: ['autodocs'],
	argTypes: {
		orientation: { options: ['auto', 'vertical', 'horizontal'], control: 'select' },
		visibility: { options: ['native', 'hover', 'visible'], control: 'select' },
		appearance: { options: ['native', 'compact'], control: 'select' },
		position: { options: ['native', 'invertX', 'invertY', 'invertAll'], control: 'select' },
	},
	decorators: [
		componentWrapperDecorator((story) => `<main><h1 class="sr-only">Scroll Area example</h1>${story}</main>`),
		moduleMetadata({ imports: [CapsScrollAreaImports, ScrollAreaStories] }),
	],
};
export default meta;
type Story = StoryObj<CapsScrollArea>;
export const Default: Story = { render: () => ({ template: '<scroll-area-stories />' }) };
const content =
	'<div class="w-[600px] p-6"><h2>Scrollable content</h2>' +
	'<p>A line of content in the viewport.</p>'.repeat(24) +
	'</div>';
export const Vertical: Story = {
	args: { orientation: 'vertical' },
	render: (args) => ({
		props: args,
		template: `<caps-scroll-area ${argsToTemplate(args)} aria-label="Article" class="h-48 w-72 max-w-full rounded-md border">${content}</caps-scroll-area>`,
	}),
};
export const Horizontal: Story = {
	args: { orientation: 'horizontal' },
	render: (args) => ({
		props: args,
		template: `<caps-scroll-area ${argsToTemplate(args)} aria-label="Wide article" class="w-72 max-w-full rounded-md border">${content}</caps-scroll-area>`,
	}),
};
export const BothAxes: Story = {
	args: { orientation: 'auto', visibility: 'visible', appearance: 'compact' },
	render: (args) => ({
		props: args,
		template: `<caps-scroll-area ${argsToTemplate(args)} aria-label="Article in both axes" class="h-48 w-72 max-w-full rounded-md border">${content}</caps-scroll-area>`,
	}),
};
