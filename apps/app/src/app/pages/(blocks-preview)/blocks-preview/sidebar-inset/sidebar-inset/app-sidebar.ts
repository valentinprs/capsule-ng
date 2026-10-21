import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCommand } from '@ng-icons/lucide';
import { data } from '../../shared/sidebar/data';
import { NavMain } from '../../shared/sidebar/nav-main';
import { NavProjects } from '../../shared/sidebar/nav-projects';
import { NavSecondary } from '../../shared/sidebar/nav-secondary';
import { NavUser } from '../../shared/sidebar/nav-user';

@Component({
	selector: 'spartan-app-sidebar-inset',
	imports: [CapsSidebarImports, NgIcon, NavMain, NavProjects, NavUser, NavSecondary],
	providers: [provideIcons({ lucideCommand })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sidebar-wrapper>
			<caps-sidebar variant="inset">
				<caps-sidebar-header>
					<caps-sidebar-menu>
						<caps-sidebar-menu-item>
							<a capsSidebarMenuButton size="lg" href="#">
								<div
									class="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
								>
									<ng-icon aria-hidden="true" name="lucideCommand" class="text-base" />
								</div>
								<div class="grid flex-1 text-left text-sm leading-tight">
									<span class="truncate font-medium">Acme Inc</span>
									<span class="truncate text-xs">Enterprise</span>
								</div>
							</a>
						</caps-sidebar-menu-item>
					</caps-sidebar-menu>
				</caps-sidebar-header>

				<caps-sidebar-content>
					<spartan-nav-main [items]="data.navMain" />
					<spartan-nav-projects [projects]="data.projects" />
					<spartan-nav-secondary class="mt-auto" [items]="data.navSecondary" />
				</caps-sidebar-content>
				<caps-sidebar-footer>
					<spartan-nav-user [user]="data.user" />
				</caps-sidebar-footer>
			</caps-sidebar>
			<ng-content />
		</caps-sidebar-wrapper>
	`,
})
export class AppSidebarInset {
	public readonly data = data;
}
