import { Component, ViewEncapsulation } from '@angular/core';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
	selector: 'spartan-sidebar-header',
	imports: [HlmSidebarImports, CapsDropdownMenuImports, NgIcon],
	providers: [
		provideIcons({
			lucideChevronDown,
		}),
	],
	encapsulation: ViewEncapsulation.None,
	styleUrl: 'sidebar-default.css',
	template: `
		<div hlmSidebarWrapper>
			<hlm-sidebar>
				<div hlmSidebarHeader>
					<ul hlmSidebarMenu>
						<li hlmSidebarMenuItem>
							<button hlmSidebarMenuButton [capsDropdownMenuTrigger]="menu">
								Select Workspace
								<ng-icon name="lucideChevronDown" class="ml-auto" />
							</button>
							<ng-template #menu>
								<caps-menu class="w-60">
									<button capsMenuItem>Acme Inc</button>
									<button capsMenuItem>Acme Corp.</button>
								</caps-menu>
							</ng-template>
						</li>
					</ul>
				</div>
			</hlm-sidebar>
			<main hlmSidebarInset>
				<header class="flex h-12 items-center justify-between px-4">
					<button hlmSidebarTrigger><span class="sr-only"></span></button>
				</header>
			</main>
		</div>
	`,
})
export default class SidebarHeaderPage {}
