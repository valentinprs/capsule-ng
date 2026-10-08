import { Component, ViewEncapsulation } from '@angular/core';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-sidebar-header',
	imports: [CapsSidebarImports, CapsDropdownMenuImports, NgIcon],
	providers: [
		provideIcons({
			lucideChevronDown,
		}),
	],
	encapsulation: ViewEncapsulation.None,
	styleUrl: 'sidebar-default.css',
	template: `
		<caps-sidebar-wrapper>
			<caps-sidebar>
				<caps-sidebar-header>
					<caps-sidebar-menu>
						<caps-sidebar-menu-item>
							<button capsSidebarMenuButton [capsDropdownMenuTrigger]="menu">
								Select Workspace
								<ng-icon aria-hidden="true" name="lucideChevronDown" class="ml-auto" />
							</button>
							<ng-template #menu>
								<caps-menu class="w-60">
									<button capsMenuItem>Acme Inc</button>
									<button capsMenuItem>Acme Corp.</button>
								</caps-menu>
							</ng-template>
						</caps-sidebar-menu-item>
					</caps-sidebar-menu>
				</caps-sidebar-header>
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
export default class SidebarHeaderPage {}
