import { RouterTestingModule } from '@angular/router/testing';
import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSlash } from '@ng-icons/lucide';
import { HlmButtonGroup, HlmButtonGroupImports } from '@spartan-ng/helm/button-group';

import type { Meta } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<HlmButtonGroup> = {
	title: 'Button Group',
	component: HlmButtonGroup,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [HlmButtonGroupImports, CapsButton, NgIcon, RouterTestingModule],
			providers: [provideIcons({ lucideSlash })],
		}),
	],
};

export default meta;
type Story = Meta<HlmButtonGroup>;

export const Default: Story = {
	render: () => ({
		template: /* HTML */ `
			<div hlmButtonGroup>
				<button capsButton variant="outline">Button 1</button>
				<button capsButton variant="outline">Button 2</button>
			</div>
		`,
	}),
};

export const Split: Story = {
	render: () => ({
		template: /* HTML */ `
			<div hlmButtonGroup>
				<button capsButton variant="secondary">Button 1</button>
				<hlm-button-group-separator />
				<button capsButton variant="secondary">Button 2</button>
			</div>
		`,
	}),
};

export const Nested: Story = {
	render: () => ({
		template: /* HTML */ `
			<div hlmButtonGroup>
				<div hlmButtonGroup>
					<button capsButton variant="outline">Button 1</button>
					<button capsButton variant="outline">Button 2</button>
				</div>
				<div hlmButtonGroup>
					<button capsButton variant="outline">Button 3</button>
					<button capsButton variant="outline">Button 4</button>
				</div>
			</div>
		`,
	}),
};

export const WithText: Story = {
	render: () => ({
		template: /* HTML */ `
			<div hlmButtonGroup>
				<div hlmButtonGroup>
					<button capsButton variant="outline">Button 1</button>
					<button capsButton variant="outline">Button 2</button>
				</div>
				<hlm-button-group-separator />
				<div hlmButtonGroup>
					<span hlmButtonGroupText>Text</span>
				</div>
			</div>
		`,
	}),
};
