import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsNavigationMenuImports } from '@capsule-ng/caps/navigation-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCircle, lucideInfo } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-navigation-menu-vertical',
	imports: [CapsNavigationMenuImports, NgIcon],
	providers: [provideIcons({ lucideCircle, lucideCheck, lucideInfo })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-navigation-menu aria-label="Vertical navigation" orientation="vertical" class="w-35">
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
								<div class="flex flex-col gap-1 text-sm">
									<div class="text-sm leading-none font-medium">Introduction</div>
									<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
										Re-usable components built using Radix UI and Tailwind CSS.
									</p>
								</div>
							</a>
						</li>
						<li>
							<a capsNavigationMenuLink href="/documentation/installation">
								<div class="flex flex-col gap-1 text-sm">
									<div class="text-sm leading-none font-medium">Installation</div>
									<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
										How to install dependencies and structure your app.
									</p>
								</div>
							</a>
						</li>
						<li>
							<a capsNavigationMenuLink href="/documentation/typography">
								<div class="flex flex-col gap-1 text-sm">
									<div class="text-sm leading-none font-medium">Typography</div>
									<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
										Styles for headings, paragraphs, lists...etc
									</p>
								</div>
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
								<div class="flex flex-col gap-1 text-sm">
									<div class="text-sm leading-none font-medium">{{ component.title }}</div>
									<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
										{{ component.description }}
									</p>
								</div>
							</a>
						}
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem>
				<a capsNavigationMenuLink class="mx-auto" href="/documentation/introduction">Docs</a>
			</li>

			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger>List</button>
				<ng-template capsNavigationMenuContent>
					<div>
						<a capsNavigationMenuLink href="/components">
							<div class="flex flex-col gap-1 text-sm">
								<div class="font-medium">Components</div>
								<div class="text-muted-foreground">Browse all components in the library.</div>
							</div>
						</a>
						<a capsNavigationMenuLink href="/documentation">
							<div class="flex flex-col gap-1 text-sm">
								<div class="font-medium">Documentation</div>
								<div class="text-muted-foreground">Learn how to use the library.</div>
							</div>
						</a>
						<a capsNavigationMenuLink href="#">
							<div class="flex flex-col gap-1 text-sm">
								<div class="font-medium">Blog</div>
								<div class="text-muted-foreground">Read our latest blog posts.</div>
							</div>
						</a>
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger>Simple</button>
				<ng-template capsNavigationMenuContent>
					<div>
						<a capsNavigationMenuLink href="/components">Components</a>
						<a capsNavigationMenuLink href="/documentation">Documentation</a>
						<a capsNavigationMenuLink href="/blocks">Blocks</a>
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger>With Icon</button>
				<ng-template capsNavigationMenuContent>
					<div>
						<a capsNavigationMenuLink href="#">
							<ng-icon name="lucideInfo" />
							Backlog
						</a>
						<a capsNavigationMenuLink href="#">
							<ng-icon name="lucideCircle" />
							To Do
						</a>
						<a capsNavigationMenuLink href="#">
							<ng-icon name="lucideCheck" />
							Done
						</a>
					</div>
				</ng-template>
			</li>
		</caps-navigation-menu>
	`,
})
export class NavigationMenuVertical {
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
