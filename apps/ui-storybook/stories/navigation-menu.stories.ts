import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircle, lucideCircleCheck, lucideCircleHelp, lucideLink } from '@ng-icons/lucide';

import { CapsNavigationMenuImports } from '@capsule-ng/caps/navigation-menu';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'navigation-menu-example',
	imports: [CapsNavigationMenuImports, NgIcon],
	providers: [provideIcons({ lucideLink, lucideCircle, lucideCircleHelp, lucideCircleCheck })],
	template: `
		<caps-navigation-menu>
			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger>Home</button>
				<ng-template capsNavigationMenuContent>
					<ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
						<li class="row-span-3">
							<a
								capsNavigationMenuLink
								class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden select-none focus:shadow-md md:p-6"
								href="/"
							>
								<div class="mb-2 text-lg font-medium sm:mt-4">Capsule</div>
								<p class="text-muted-foreground text-sm leading-tight">
									Beautifully designed components built with Tailwind CSS.
								</p>
							</a>
						</li>

						<li>
							<a capsNavigationMenuLink href="/documentation/introduction">
								<div class="text-sm leading-none font-medium">Introduction</div>
								<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
									Re-usable components built using Radix UI and Tailwind CSS.
								</p>
							</a>
						</li>
						<li>
							<a capsNavigationMenuLink href="/documentation/installation">
								<div class="text-sm leading-none font-medium">Installation</div>
								<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
									How to install dependencies and structure your app.
								</p>
							</a>
						</li>
						<li>
							<a capsNavigationMenuLink href="/documentation/typography">
								<div class="text-sm leading-none font-medium">Typography</div>
								<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
									Styles for headings, paragraphs, lists...etc
								</p>
							</a>
						</li>
					</ul>
				</ng-template>
			</li>

			<!-- Components Menu -->
			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger>Components</button>
				<ng-template capsNavigationMenuContent>
					<div class="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
						@for (component of _components; track $index) {
							<a capsNavigationMenuLink [href]="component.href">
								<div class="text-sm leading-none font-medium">{{ component.title }}</div>
								<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
									{{ component.description }}
								</p>
							</a>
						}
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem>
				<a capsNavigationMenuLink href="/docs" active>Docs</a>
			</li>

			<li capsNavigationMenuItem class="hidden md:block">
				<button caps-navigation-menu-trigger>List</button>
				<ng-template capsNavigationMenuContent>
					<div class="grid w-[300px] gap-4">
						<a capsNavigationMenuLink href="/components" class="cursor-pointer">
							<div class="font-medium">Components</div>
							<div class="text-muted-foreground">Browse all components in the library.</div>
						</a>
						<a capsNavigationMenuLink href="/documentation" class="cursor-pointer">
							<div class="font-medium">Documentation</div>
							<div class="text-muted-foreground">Learn how to use the library.</div>
						</a>
						<a capsNavigationMenuLink href="#" class="cursor-pointer">
							<div class="font-medium">Blog</div>
							<div class="text-muted-foreground">Read our latest blog posts.</div>
						</a>
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem class="hidden md:block">
				<button caps-navigation-menu-trigger>Simple</button>
				<ng-template capsNavigationMenuContent>
					<div class="grid w-[200px] gap-4">
						<a capsNavigationMenuLink href="/components" class="cursor-pointer">Components</a>
						<a capsNavigationMenuLink href="/documentation" class="cursor-pointer">Documentation</a>
						<a capsNavigationMenuLink href="/blocks" class="cursor-pointer">Blocks</a>
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem class="hidden md:block">
				<button caps-navigation-menu-trigger>With Icon</button>
				<ng-template capsNavigationMenuContent>
					<div class="grid w-[200px] gap-4">
						<a capsNavigationMenuLink href="#" class="cursor-pointer flex-row items-center gap-2">
							<ng-icon name="lucideCircleHelp" />
							Backlog
						</a>
						<a capsNavigationMenuLink href="#" class="cursor-pointer flex-row items-center gap-2">
							<ng-icon name="lucideCircle" />
							To Do
						</a>
						<a capsNavigationMenuLink href="#" class="cursor-pointer flex-row items-center gap-2">
							<ng-icon name="lucideCircleCheck" />
							Done
						</a>
					</div>
				</ng-template>
			</li>
		</caps-navigation-menu>
	`,
})
class NavigationMenuExample {
	protected readonly _components = [
		{
			title: 'Alert Dialog',
			description: 'A modal dialog that interrupts the user with important content and expects a response.',
			href: '/components/alert-dialog',
		},
		{
			title: 'Hover Card',
			description: 'For sighted users to preview content available behind a link.',
			href: '/components/hover-card',
		},
		{
			title: 'Progress',
			description: 'Displays an indicator showing the completion progress of a task.',
			href: '/components/progress',
		},
		{
			title: 'Scroll Area',
			description: 'Visually or semantically separates content.',
			href: '/components/scroll-area',
		},
		{
			title: 'Tabs',
			description: 'A set of layered content panels displayed one at a time.',
			href: '/components/tabs',
		},
		{
			title: 'Tooltip',
			description: 'A popup that displays information on hover or focus.',
			href: '/components/tooltip',
		},
	];
}

@Component({
	selector: 'navigation-menu-click-to-open-example',
	imports: [CapsNavigationMenuImports, NgIcon],
	providers: [provideIcons({ lucideLink, lucideCircle, lucideCircleHelp, lucideCircleCheck })],
	template: `
		<caps-navigation-menu openOn="click">
			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger>Home</button>
				<ng-template capsNavigationMenuContent>
					<ul class="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
						<li class="row-span-3">
							<a
								capsNavigationMenuLink
								class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden select-none focus:shadow-md md:p-6"
								href="/"
							>
								<div class="mb-2 text-lg font-medium sm:mt-4">Capsule</div>
								<p class="text-muted-foreground text-sm leading-tight">
									Beautifully designed components built with Tailwind CSS.
								</p>
							</a>
						</li>

						<li>
							<a capsNavigationMenuLink href="/documentation/introduction">
								<div class="text-sm leading-none font-medium">Introduction</div>
								<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
									Re-usable components built using Radix UI and Tailwind CSS.
								</p>
							</a>
						</li>
						<li>
							<a capsNavigationMenuLink href="/documentation/installation">
								<div class="text-sm leading-none font-medium">Installation</div>
								<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
									How to install dependencies and structure your app.
								</p>
							</a>
						</li>
						<li>
							<a capsNavigationMenuLink href="/documentation/typography">
								<div class="text-sm leading-none font-medium">Typography</div>
								<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
									Styles for headings, paragraphs, lists...etc
								</p>
							</a>
						</li>
					</ul>
				</ng-template>
			</li>

			<!-- Components Menu -->
			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger>Components</button>
				<ng-template capsNavigationMenuContent>
					<div class="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
						@for (component of _components; track $index) {
							<a capsNavigationMenuLink [href]="component.href">
								<div class="text-sm leading-none font-medium">{{ component.title }}</div>
								<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
									{{ component.description }}
								</p>
							</a>
						}
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem>
				<a capsNavigationMenuLink href="/docs" active>Docs</a>
			</li>

			<li capsNavigationMenuItem class="hidden md:block">
				<button caps-navigation-menu-trigger>List</button>
				<ng-template capsNavigationMenuContent>
					<div class="grid w-[300px] gap-4">
						<a capsNavigationMenuLink href="/components" class="cursor-pointer">
							<div class="font-medium">Components</div>
							<div class="text-muted-foreground">Browse all components in the library.</div>
						</a>
						<a capsNavigationMenuLink href="/documentation" class="cursor-pointer">
							<div class="font-medium">Documentation</div>
							<div class="text-muted-foreground">Learn how to use the library.</div>
						</a>
						<a capsNavigationMenuLink href="#" class="cursor-pointer">
							<div class="font-medium">Blog</div>
							<div class="text-muted-foreground">Read our latest blog posts.</div>
						</a>
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem class="hidden md:block">
				<button caps-navigation-menu-trigger>Simple</button>
				<ng-template capsNavigationMenuContent>
					<div class="grid w-[200px] gap-4">
						<a capsNavigationMenuLink href="/components" class="cursor-pointer">Components</a>
						<a capsNavigationMenuLink href="/documentation" class="cursor-pointer">Documentation</a>
						<a capsNavigationMenuLink href="/blocks" class="cursor-pointer">Blocks</a>
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem class="hidden md:block">
				<button caps-navigation-menu-trigger>With Icon</button>
				<ng-template capsNavigationMenuContent>
					<div class="grid w-[200px] gap-4">
						<a capsNavigationMenuLink href="#" class="cursor-pointer flex-row items-center gap-2">
							<ng-icon name="lucideCircleHelp" />
							Backlog
						</a>
						<a capsNavigationMenuLink href="#" class="cursor-pointer flex-row items-center gap-2">
							<ng-icon name="lucideCircle" />
							To Do
						</a>
						<a capsNavigationMenuLink href="#" class="cursor-pointer flex-row items-center gap-2">
							<ng-icon name="lucideCircleCheck" />
							Done
						</a>
					</div>
				</ng-template>
			</li>
		</caps-navigation-menu>
	`,
})
class NavigationMenuClickToOpenExample {
	protected readonly _components = [
		{
			title: 'Alert Dialog',
			description: 'A modal dialog that interrupts the user with important content and expects a response.',
			href: '/components/alert-dialog',
		},
		{
			title: 'Hover Card',
			description: 'For sighted users to preview content available behind a link.',
			href: '/components/hover-card',
		},
		{
			title: 'Progress',
			description: 'Displays an indicator showing the completion progress of a task.',
			href: '/components/progress',
		},
		{
			title: 'Scroll Area',
			description: 'Visually or semantically separates content.',
			href: '/components/scroll-area',
		},
		{
			title: 'Tabs',
			description: 'A set of layered content panels displayed one at a time.',
			href: '/components/tabs',
		},
		{
			title: 'Tooltip',
			description: 'A popup that displays information on hover or focus.',
			href: '/components/tooltip',
		},
	];
}

export default {
	title: 'Navigation Menu',
	component: NavigationMenuExample,
	tags: ['autodocs'],
	decorators: [
		moduleMetadata({
			imports: [CapsNavigationMenuImports, NavigationMenuClickToOpenExample],
		}),
	],
} as Meta<NavigationMenuExample>;

type Story = StoryObj<NavigationMenuExample>;

export const Default: Story = {
	render: () => ({
		template: `
<navigation-menu-example></navigation-menu-example>
		`,
	}),
};

export const ClickToOpen: Story = {
	render: () => ({
		template: `<navigation-menu-click-to-open-example></navigation-menu-click-to-open-example>`,
	}),
};
