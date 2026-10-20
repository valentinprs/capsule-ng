import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsHeader, CapsHeaderImports } from '@capsule-ng/caps/header';
import { CapsNavigationMenuImports } from '@capsule-ng/caps/navigation-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCommand, lucideMoon } from '@ng-icons/lucide';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

export default {
	title: 'Header',
	component: CapsHeader,
	tags: ['autodocs'],
	parameters: { layout: 'fullscreen' },
	decorators: [
		moduleMetadata({
			imports: [CapsHeaderImports, CapsNavigationMenuImports, CapsButtonImports, CapsAvatarImports, NgIcon],
			providers: [provideIcons({ lucideCommand, lucideMoon })],
		}),
	],
} as Meta<CapsHeader>;

type Story = StoryObj<CapsHeader>;

const links = ['Getting started', 'Components', 'Foundations', 'Patterns'];

export const Default: Story = {
	render: () => ({
		props: { links },
		template: `
			<caps-header>
				<caps-header-menu title="Capsule navigation">
					<nav aria-label="Primary">
						@for (link of links; track link) {
							<a capsButton variant="ghost" class="w-full justify-start" href="#">{{ link }}</a>
						}
					</nav>
				</caps-header-menu>
				<caps-header-visual>
					<span class="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-lg">
						<ng-icon name="lucideCommand" aria-hidden="true" />
					</span>
				</caps-header-visual>
				<caps-header-title>Capsule</caps-header-title>
				<caps-header-nav>
					<caps-navigation-menu aria-label="Primary">
						@for (link of links; track link; let first = $first) {
							<li capsNavigationMenuItem><a capsNavigationMenuLink href="#" [active]="first">{{ link }}</a></li>
						}
					</caps-navigation-menu>
				</caps-header-nav>
				<caps-header-actions>
					<button capsButton variant="ghost" size="icon" type="button" aria-label="Toggle theme">
						<ng-icon name="lucideMoon" aria-hidden="true" />
					</button>
					<caps-avatar><caps-avatar-fallback>JD</caps-avatar-fallback></caps-avatar>
				</caps-header-actions>
			</caps-header>
		`,
	}),
};

export const Minimal: Story = {
	render: () => ({
		template: `
			<caps-header>
				<caps-header-title>MyHandover</caps-header-title>
			</caps-header>
		`,
	}),
};
