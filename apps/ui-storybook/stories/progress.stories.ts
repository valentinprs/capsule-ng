import { CapsProgress, CapsProgressImports } from '@capsule-ng/caps/progress';
import type { BrnProgressLabelFn } from '@spartan-ng/brain/progress';
import {
	type Meta,
	type StoryObj,
	argsToTemplate,
	componentWrapperDecorator,
	moduleMetadata,
} from '@storybook/angular';

type ProgressArgs = { value: number | null | undefined; max: number; getValueLabel: BrnProgressLabelFn };
const meta: Meta<ProgressArgs> = {
	title: 'Progress',
	component: CapsProgress,
	tags: ['autodocs'],
	args: { value: 30 },
	argTypes: { value: { control: { type: 'range', min: 0, max: 100, step: 2 } } },
	decorators: [
		moduleMetadata({ imports: [CapsProgressImports] }),
		componentWrapperDecorator(
			(story) => `<main><h1 class="mb-4 text-lg font-semibold">Progress examples</h1>${story}</main>`,
		),
	],
	render: (args) => ({
		props: args,
		template: `<div class="grid w-full max-w-sm gap-2"><span id="loading-label">Loading (started)</span><caps-progress aria-labelledby="loading-label" ${argsToTemplate(args)} /></div>`,
	}),
};
export default meta;
type Story = StoryObj<ProgressArgs>;
export const LoadingNotStarted: Story = {
	args: { value: 0 },
	render: (args) => ({
		props: args,
		template: `<div class="grid w-full max-w-sm gap-2"><span id="loading-label">Loading (not started)</span><caps-progress aria-labelledby="loading-label" ${argsToTemplate(args)} /></div>`,
	}),
};
export const LoadingStarted: Story = {};
export const Indeterminate: Story = {
	args: { value: null },
	render: (args) => ({
		props: args,
		template: `<div class="grid w-full max-w-sm gap-2"><span id="indeterminate-label">Indeterminate</span><caps-progress aria-labelledby="indeterminate-label" ${argsToTemplate(args)} /></div>`,
	}),
};
export const Complete: Story = {
	args: { value: 100 },
	render: (args) => ({
		props: args,
		template: `<div class="grid w-full max-w-sm gap-2"><span id="complete-label">Complete</span><caps-progress aria-labelledby="complete-label" ${argsToTemplate(args)} /></div>`,
	}),
};
export const Small: Story = {
	render: () => ({ template: `<caps-progress class="h-1 w-full max-w-sm" [value]="40" aria-label="Upload" />` }),
};
export const CustomMaximum: Story = {
	args: { value: 75, max: 150 },
	render: (args) => ({
		props: args,
		template: `<div class="grid w-full max-w-sm gap-2"><span id="upload-label">Upload</span><caps-progress aria-labelledby="upload-label" aria-describedby="upload-help" ${argsToTemplate(args)} /><span id="upload-help">75 of 150 MB</span></div>`,
	}),
};
export const CustomValueLabel: Story = {
	args: { value: 75, max: 150, getValueLabel: (value, max) => `${value} of ${max} MB` },
};
export const NativeName: Story = {
	render: () => ({
		template: `<caps-progress class="w-full max-w-sm" [value]="30" aria-label="Uploading document" />`,
	}),
};
