import { Component, ViewEncapsulation } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChartPie, lucideFrame, lucideMap, lucidePlus } from '@ng-icons/lucide';
import { toast } from '@spartan-ng/brain/sonner';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';

@Component({
	selector: 'spartan-sidebar-group-action',
	imports: [CapsSidebarImports, NgIcon, HlmToasterImports],
	providers: [
		provideIcons({
			lucideFrame,
			lucideChartPie,
			lucideMap,
			lucidePlus,
		}),
	],
	encapsulation: ViewEncapsulation.None,
	styleUrl: 'sidebar-default.css',
	template: `
		<hlm-toaster />
		<caps-sidebar-wrapper>
			<caps-sidebar>
				<caps-sidebar-content>
					<caps-sidebar-group>
						<caps-sidebar-group-label>Projects</caps-sidebar-group-label>
						<button capsSidebarGroupAction title="Add Project" (click)="_onAddProject()">
							<ng-icon aria-hidden="true" name="lucidePlus" />
							<span class="sr-only">Add Project</span>
						</button>
						<caps-sidebar-group-content>
							<caps-sidebar-menu>
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton>
										<ng-icon aria-hidden="true" name="lucideFrame" />
										<span>Design Engineering</span>
									</button>
								</caps-sidebar-menu-item>
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton>
										<ng-icon aria-hidden="true" name="lucideChartPie" />
										<span>Sales & Marketing</span>
									</button>
								</caps-sidebar-menu-item>
								<caps-sidebar-menu-item>
									<button capsSidebarMenuButton>
										<ng-icon aria-hidden="true" name="lucideMap" />
										<span>Travel</span>
									</button>
								</caps-sidebar-menu-item>
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
export default class SidebarGroupActionPage {
	protected _onAddProject(): void {
		toast.info('You clicked the group action!');
	}
}
