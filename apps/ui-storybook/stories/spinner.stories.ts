import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsSpinner } from '@capsule-ng/caps/spinner';
import {
	type Meta,
	type StoryObj,
	argsToTemplate,
	componentWrapperDecorator,
	moduleMetadata,
} from '@storybook/angular';
const meta: Meta<CapsSpinner> = {
	title: 'Spinner',
	component: CapsSpinner,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({ imports: [CapsSpinner, CapsButtonImports] }),
		componentWrapperDecorator(
			(story) => `<main><h1 class="mb-4 text-lg font-semibold">Spinner examples</h1>${story}</main>`,
		),
	],
	render: (args) => ({ props: args, template: `<caps-spinner ${argsToTemplate(args)} />` }),
};
export default meta;
type Story = StoryObj<CapsSpinner>;
export const Default: Story = { args: { ariaLabel: 'Loading documents' } };
export const Small: Story = {
	render: () => ({ template: `<caps-spinner class="text-xs" aria-label="Loading documents" />` }),
};
export const CustomName: Story = { args: { ariaLabel: 'Saving document' } };
export const Decorative: Story = {
	render: () => ({
		template: `<button capsButton type="button" disabled><caps-spinner aria-hidden="true" class="text-sm" />Saving…</button>`,
	}),
};
