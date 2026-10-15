import { Component, ViewEncapsulation } from '@angular/core';
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';

import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';

@Component({
	selector: 'spartan-sidebar-menu-sub-collapsable',
	imports: [CapsSidebarImports, CapsCollapsibleImports, NgIcon],
	providers: [provideIcons({ lucideChevronRight })],
	encapsulation: ViewEncapsulation.None,
	styleUrl: 'sidebar-default.css',
	template: `
		<caps-sidebar-wrapper>
			<caps-sidebar>
				<caps-sidebar-content>
					<caps-sidebar-group>
						<caps-sidebar-group-content>
							<caps-sidebar-menu>
								@for (item of _items; track item.title) {
									<caps-sidebar-menu-item>
										<caps-collapsible [expanded]="item.defaultOpen" class="group/collapsible">
											<button
												capsCollapsibleTrigger
												capsSidebarMenuButton
												class="flex w-full items-center justify-between"
											>
												<span>{{ item.title }}</span>
												<ng-icon
													aria-hidden="true"
													name="lucideChevronRight"
													class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
													hlm
												/>
											</button>
											<caps-collapsible-content>
												<caps-sidebar-menu-sub>
													@for (subItem of item.items; track subItem.title) {
														<caps-sidebar-menu-sub-item>
															<button capsSidebarMenuSubButton class="w-full">
																<span>{{ subItem.title }}</span>
															</button>
														</caps-sidebar-menu-sub-item>
													}
												</caps-sidebar-menu-sub>
											</caps-collapsible-content>
										</caps-collapsible>
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
export default class SidebarMenuSubPageCollapsable {
	protected readonly _items = [
		{
			title: 'Getting Started',
			defaultOpen: true,
			items: [{ title: 'Installation' }, { title: 'Project Structure' }],
		},
		{
			title: 'Building Your Application',
			defaultOpen: false,
			items: [
				{ title: 'Routing' },
				{ title: 'Data Fetching', isActive: true },
				{ title: 'Rendering' },
				{ title: 'Caching' },
				{ title: 'Styling' },
				{ title: 'Optimizing' },
				{ title: 'Configuring' },
				{ title: 'Testing' },
				{ title: 'Authentication' },
				{ title: 'Deploying' },
				{ title: 'Upgrading' },
				{ title: 'Examples' },
			],
		},
		{
			title: 'API Reference',
			defaultOpen: false,
			items: [
				{ title: 'Components' },
				{ title: 'File Conventions' },
				{ title: 'Functions' },
				{ title: 'next.config.js Options' },
				{ title: 'CLI' },
				{ title: 'Edge Runtime' },
			],
		},
		{
			title: 'Architecture',
			defaultOpen: false,
			items: [
				{ title: 'Accessibility' },
				{ title: 'Fast Refresh' },
				{ title: 'Next.js Compiler' },
				{ title: 'Supported Browsers' },
				{ title: 'Turbopack' },
			],
		},
	];
}
