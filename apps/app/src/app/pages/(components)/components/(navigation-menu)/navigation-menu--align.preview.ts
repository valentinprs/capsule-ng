import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsNavigationMenuImports } from '@capsule-ng/caps/navigation-menu';

@Component({
	selector: 'spartan-navigation-menu-align',
	imports: [CapsNavigationMenuImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-navigation-menu aria-label="Alignment examples">
			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger align="start">Start</button>
				<ng-template capsNavigationMenuContent>
					<div class="w-48">
						<a capsNavigationMenuLink href="/">
							<div class="flex flex-col gap-1 text-sm">
								<div class="leading-none font-medium">Aligned Start</div>
								<div class="text-muted-foreground line-clamp-2">Content aligns to the start of the trigger.</div>
							</div>
						</a>
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger align="center">Center</button>
				<ng-template capsNavigationMenuContent>
					<div class="w-48">
						<a capsNavigationMenuLink href="/">
							<div class="flex flex-col gap-1 text-sm">
								<div class="leading-none font-medium">Aligned Center</div>
								<div class="text-muted-foreground line-clamp-2">Content aligns to the center of the trigger.</div>
							</div>
						</a>
					</div>
				</ng-template>
			</li>

			<li capsNavigationMenuItem>
				<button caps-navigation-menu-trigger align="end">End</button>
				<ng-template capsNavigationMenuContent>
					<div class="w-48">
						<a capsNavigationMenuLink href="/">
							<div class="flex flex-col gap-1 text-sm">
								<div class="leading-none font-medium">Aligned End</div>
								<div class="text-muted-foreground line-clamp-2">Content aligns to the end of the trigger.</div>
							</div>
						</a>
					</div>
				</ng-template>
			</li>
		</caps-navigation-menu>
	`,
})
export class NavigationMenuAlign {}
