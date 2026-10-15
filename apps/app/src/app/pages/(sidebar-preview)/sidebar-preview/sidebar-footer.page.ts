import { Component, ViewEncapsulation } from '@angular/core';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronUp } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-sidebar-footer',
	imports: [CapsSidebarImports, CapsDropdownMenuImports, NgIcon],
	providers: [
		provideIcons({
			lucideChevronUp,
		}),
	],
	encapsulation: ViewEncapsulation.None,
	styleUrl: 'sidebar-default.css',
	template: `
		<caps-sidebar-wrapper>
			<caps-sidebar>
				<caps-sidebar-header></caps-sidebar-header>
				<caps-sidebar-content></caps-sidebar-content>
				<caps-sidebar-footer>
					<caps-sidebar-menu>
						<caps-sidebar-menu-item>
							<button capsSidebarMenuButton [capsDropdownMenuTrigger]="menu">
								Select Workspace
								<ng-icon aria-hidden="true" name="lucideChevronUp" class="ml-auto" />
							</button>
							<ng-template #menu>
								<caps-menu class="w-60">
									<button capsMenuItem>Account</button>
									<button capsMenuItem>Billing</button>
									<button capsMenuItem>Sign out</button>
								</caps-menu>
							</ng-template>
						</caps-sidebar-menu-item>
					</caps-sidebar-menu>
				</caps-sidebar-footer>
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
export default class SidebarFooterPage {}
