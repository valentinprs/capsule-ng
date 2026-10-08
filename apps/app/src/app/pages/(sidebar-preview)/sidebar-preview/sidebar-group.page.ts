import { Component, ViewEncapsulation } from '@angular/core';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLifeBuoy, lucideSend } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-sidebar-group',
	imports: [CapsSidebarImports, NgIcon],
	providers: [
		provideIcons({
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
						<caps-sidebar-group-label>Help</caps-sidebar-group-label>
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
export default class SidebarGroupPage {}
