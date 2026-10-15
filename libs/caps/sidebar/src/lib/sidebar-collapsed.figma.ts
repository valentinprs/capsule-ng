// url=https://www.figma.com/design/oNJ7czLtkjSaXRqbCGF18z/Do-not-use---Capsule-2?node-id=2351-3048
// source=libs/caps/sidebar/src/lib/caps-sidebar.ts
// component=CapsSidebar
import figma from 'figma';

// A skeleton of an icon-collapsible sidebar, rendered from data (`@for`): when collapsed, the
// labels are hidden and shown as tooltips. The sidebar starts collapsed with
// `provideCapsSidebarConfig({ defaultOpen: false })` (or `CapsSidebarService.setOpen(false)`). The
// avatars of the header and footer are examples (`caps-avatar`).
export default {
	example: figma.code`<caps-sidebar-wrapper>
	<caps-sidebar collapsible="icon">
		<caps-sidebar-header>
			<!-- avatar -->
		</caps-sidebar-header>
		<caps-sidebar-content>
			<caps-sidebar-group>
				<caps-sidebar-group-content>
					<caps-sidebar-menu>
						@for (item of items; track item.title) {
							<caps-sidebar-menu-item>
								<a capsSidebarMenuButton [href]="item.url" [tooltip]="item.title" [isActive]="item.active">
									<ng-icon aria-hidden="true" [name]="item.icon" />
									<span>{{ item.title }}</span>
								</a>
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
		"import { CapsSidebarImports, provideCapsSidebarConfig } from '@capsule-ng/caps/sidebar';",
		"import { NgIcon } from '@ng-icons/core';",
	],
	id: 'caps-sidebar-collapsed',
};
