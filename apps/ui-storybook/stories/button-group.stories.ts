import { RouterTestingModule } from '@angular/router/testing';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsButtonGroup, CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSlash } from '@ng-icons/lucide';

import type { Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<CapsButtonGroup> = {
	title: 'Button Group',
	component: CapsButtonGroup,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsButtonGroupImports, CapsButton, NgIcon, RouterTestingModule],
			providers: [provideIcons({ lucideSlash })],
		}),
	],
};

export default meta;
type Story = Meta<CapsButtonGroup>;

export const Default: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline">Button 1</button>
				<button capsButton variant="outline">Button 2</button>
			</caps-button-group>
		`,
	}),
};

export const Split: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-button-group aria-label="Actions">
				<button capsButton variant="secondary">Button 1</button>
				<caps-separator orientation="vertical" />
				<button capsButton variant="secondary">Button 2</button>
			</caps-button-group>
		`,
	}),
};

export const Nested: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-button-group aria-label="Actions">
				<caps-button-group aria-label="Actions">
					<button capsButton variant="outline">Button 1</button>
					<button capsButton variant="outline">Button 2</button>
				</caps-button-group>
				<caps-button-group aria-label="Actions">
					<button capsButton variant="outline">Button 3</button>
					<button capsButton variant="outline">Button 4</button>
				</caps-button-group>
			</caps-button-group>
		`,
	}),
};

export const WithText: Story = {
	render: () => ({
		template: /* HTML */ `
			<caps-button-group aria-label="Actions">
				<caps-button-group aria-label="Actions">
					<button capsButton variant="outline">Button 1</button>
					<button capsButton variant="outline">Button 2</button>
				</caps-button-group>
				<caps-separator orientation="vertical" />

				<caps-button-group-text>Text</caps-button-group-text>
			</caps-button-group>
		`,
	}),
};

export const Stacked: Story = {
	render: () => ({
		template: `<caps-button-group stacked aria-label="Media controls"><button capsButton variant="outline">Play</button><button capsButton variant="outline">Pause</button></caps-button-group>`,
	}),
};
export const Fluid: Story = {
	render: () => ({
		template: `<caps-button-group fluid aria-label="Save changes"><button capsButton>Save</button><button capsButton variant="outline">Cancel</button></caps-button-group>`,
	}),
};
export const FluidOverridesStacked: Story = {
	render: () => ({
		template: `<caps-button-group fluid stacked aria-label="Save changes"><button capsButton>Save</button><button capsButton variant="outline">Cancel</button></caps-button-group>`,
	}),
};
