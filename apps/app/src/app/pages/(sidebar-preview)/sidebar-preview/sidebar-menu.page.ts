import { Component, ViewEncapsulation } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChartPie, lucideFrame, lucideLifeBuoy, lucideMap, lucideSend } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-sidebar-menu',
	imports: [CapsSidebarImports, NgIcon],
	providers: [
		provideIcons({
			lucideFrame,
			lucideChartPie,
			lucideMap,
			lucideLifeBuoy,
			lucideSend,
		}),
	],
	encapsulation: ViewEncapsulation.None,
	styleUrl: 'sidebar-default.css',
	template: `
		<caps-sidebar-wrapper>
			<caps-sidebar>
				<caps-sidebar-content>
					<caps-sidebar-group>
						<caps-sidebar-group-label>Projects</caps-sidebar-group-label>
						<caps-sidebar-group-content>
							<caps-sidebar-menu>
								@for (project of _projects; track project) {
									<caps-sidebar-menu-item>
										<button capsSidebarMenuButton>
											<ng-icon aria-hidden="true" [name]="project.icon" />
											<span>{{ project.name }}</span>
										</button>
									</caps-sidebar-menu-item>
								}
							</caps-sidebar-menu>
						</caps-sidebar-group-content>
					</caps-sidebar-group>
				</caps-sidebar-content>
			</caps-sidebar>
			<caps-sidebar-inset>
				<div class="flex min-w-0 flex-1 flex-col">
					<header class="flex h-12 items-center justify-between px-4">
						<button capsSidebarTrigger></button>
					</header>
				</div>
			</caps-sidebar-inset>
		</caps-sidebar-wrapper>
	`,
})
export default class SidebarMenuPage {
	protected readonly _projects = [
		{ name: 'Design Engineering', icon: 'lucideFrame' },
		{ name: 'Sales & Marketing', icon: 'lucideChartPie' },
		{ name: 'Travel', icon: 'lucideMap' },
		{ name: 'Support', icon: 'lucideLifeBuoy' },
		{ name: 'Feedback', icon: 'lucideSend' },
	];
}
