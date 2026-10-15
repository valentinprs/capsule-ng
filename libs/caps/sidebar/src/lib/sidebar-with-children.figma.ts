// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2351-3044
// source=libs/caps/sidebar/src/lib/caps-sidebar.ts
// component=CapsSidebar
import figma from 'figma';

// A skeleton of the sidebar structure: the menu is rendered from data (`@for`), with collapsible
// items holding their sub items. The workspace switcher (header) and the user menu (footer) are
// examples to build with a `capsSidebarMenuButton` opening a `caps-menu`.
export default {
	example: figma.code`<caps-sidebar-wrapper>
	<caps-sidebar>
		<caps-sidebar-header>
			<!-- workspace switcher -->
		</caps-sidebar-header>
		<caps-sidebar-content>
			<caps-sidebar-group>
				<caps-sidebar-group-label>Group label</caps-sidebar-group-label>
				<caps-sidebar-group-content>
					<caps-sidebar-menu>
						@for (item of items; track item.title) {
							<caps-sidebar-menu-item>
								<caps-collapsible [expanded]="item.expanded" class="group/collapsible">
									<button capsCollapsibleTrigger capsSidebarMenuButton>
										<ng-icon aria-hidden="true" [name]="item.icon" />
										<span>{{ item.title }}</span>
										<ng-icon
											aria-hidden="true"
											name="lucideChevronRight"
											class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
										/>
									</button>
									<caps-collapsible-content>
										<caps-sidebar-menu-sub>
											@for (subItem of item.items; track subItem.title) {
												<caps-sidebar-menu-sub-item>
													<a capsSidebarMenuSubButton [href]="subItem.url" [isActive]="subItem.active">
														<span>{{ subItem.title }}</span>
													</a>
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
		<caps-sidebar-footer>
			<!-- user menu -->
		</caps-sidebar-footer>
	</caps-sidebar>
	<caps-sidebar-inset>
		<button capsSidebarTrigger></button>
	</caps-sidebar-inset>
</caps-sidebar-wrapper>`,
	imports: [
		"import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';",
		"import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';",
		"import { NgIcon, provideIcons } from '@ng-icons/core';",
		"import { lucideChevronRight } from '@ng-icons/lucide';",
	],
	id: 'caps-sidebar',
};
