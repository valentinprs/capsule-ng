import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsNavigationMenuImports } from '@capsule-ng/caps/navigation-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideCircle, lucideInfo } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-navigation-menu-preview',
	imports: [CapsNavigationMenuImports, NgIcon, RouterLink],
	providers: [provideIcons({ lucideCircle, lucideCheck, lucideInfo })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-navigation-menu aria-label="Component navigation">
			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger>Getting started</button>
				<ng-template capsNavigationMenuContent>
					<ul class="w-96 max-w-[calc(100vw-2rem)]">
						<li>
							<a capsNavigationMenuLink routerLink="/documentation/introduction">
								<div class="flex flex-col gap-1 text-sm">
									<div class="leading-none font-medium">Introduction</div>
									<div class="text-muted-foreground line-clamp-2">Re-usable components built with Tailwind CSS.</div>
								</div>
							</a>
						</li>

						<li>
							<a capsNavigationMenuLink routerLink="/documentation/installation">
								<div class="flex flex-col gap-1 text-sm">
									<div class="leading-none font-medium">Installation</div>
									<div class="text-muted-foreground line-clamp-2">
										How to install dependencies and structure your app.
									</div>
								</div>
							</a>
						</li>
						<li>
							<a capsNavigationMenuLink routerLink="/documentation/typography">
								<div class="flex flex-col gap-1 text-sm">
									<div class="leading-none font-medium">Typography</div>
									<div class="text-muted-foreground line-clamp-2">Styles for headings, paragraphs, lists...etc</div>
								</div>
							</a>
						</li>
					</ul>
				</ng-template>
			</li>

			<!-- Components Menu -->
			<li capsNavigationMenuItem class="hidden md:flex">
				<button caps-navigation-menu-trigger align="center">Components</button>
				<ng-template capsNavigationMenuContent>
					<div class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
						@for (component of _components; track $index) {
							<a capsNavigationMenuLink [href]="component.href">
								<div class="flex flex-col gap-1 text-sm">
									<div class="leading-none font-medium">{{ component.title }}</div>
									<div class="text-muted-foreground line-clamp-2">{{ component.description }}</div>
								</div>
							</a>
						}
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger align="end">With Icon</button>
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

			<li capsNavigationMenuItem>
				<a capsNavigationMenuLink href="/documentation/introduction" active>Docs</a>
			</li>
		</caps-navigation-menu>
	`,
})
export class NavigationMenuPreview {
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

export const defaultImports = `
import { CapsNavigationMenuImports } from '@capsule-ng/caps/navigation-menu';
`;

export const defaultSkeleton = `
<caps-navigation-menu aria-label="Primary navigation">
 <li capsNavigationMenuItem>
  <button caps-navigation-menu-trigger>Documentation</button>
  <ng-template capsNavigationMenuContent>
   <a capsNavigationMenuLink href="/documentation/introduction" active>Introduction</a>
  </ng-template>
 </li>
 <li capsNavigationMenuItem><a capsNavigationMenuLink href="/components">Components</a></li>
</caps-navigation-menu>
`;
