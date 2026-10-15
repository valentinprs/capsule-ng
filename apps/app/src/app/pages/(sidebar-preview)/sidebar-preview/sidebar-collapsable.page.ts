import { Component, ViewEncapsulation } from '@angular/core';
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideLifeBuoy, lucideSend } from '@ng-icons/lucide';

import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';

@Component({
	selector: 'spartan-sidebar-collapsable',
	imports: [NgIcon, CapsCollapsibleImports, CapsSidebarImports],
	providers: [
		provideIcons({
			lucideLifeBuoy,
			lucideSend,
			lucideChevronDown,
		}),
	],
	encapsulation: ViewEncapsulation.None,
	styleUrl: 'sidebar-default.css',
	template: `
		<caps-sidebar-wrapper>
			<caps-sidebar>
				<caps-sidebar-content>
					<caps-collapsible [expanded]="true" class="group/collapsible">
						<caps-sidebar-group>
							<button
								capsCollapsibleTrigger
								capsSidebarGroupLabel
								class="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
							>
								Help
								<ng-icon
									aria-hidden="true"
									hlm
									name="lucideChevronDown"
									class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
								/>
							</button>
							<caps-collapsible-content>
								<caps-sidebar-group-content>
									<caps-sidebar-menu>
										<caps-sidebar-menu-item>
											<a capsSidebarMenuButton href="#">
												<ng-icon aria-hidden="true" name="lucideLifeBuoy" />
												<span>Support</span>
											</a>
										</caps-sidebar-menu-item>
										<caps-sidebar-menu-item>
											<a capsSidebarMenuButton href="#">
												<ng-icon aria-hidden="true" name="lucideSend" />
												<span>Feedback</span>
											</a>
										</caps-sidebar-menu-item>
									</caps-sidebar-menu>
								</caps-sidebar-group-content>
							</caps-collapsible-content>
						</caps-sidebar-group>
					</caps-collapsible>
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
export default class SidebarCollapsablePage {}
