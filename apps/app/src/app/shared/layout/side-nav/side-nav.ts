import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { sidenavItems } from '@spartan-ng/app/app/shared/components/navigation-items';
import { SpartanNewMarker } from '@spartan-ng/app/app/shared/spartan-new-marker';

@Component({
	selector: 'spartan-side-nav',
	imports: [CapsSidebarImports, RouterLink, RouterLinkActive, SpartanNewMarker],
	host: {
		class: 'contents',
	},
	template: `
		<caps-sidebar-wrapper
			class="flex-1 [--sidebar-width:220px]! [--top-spacing:0] lg:[--sidebar-width:240px]! lg:[--top-spacing:calc(var(--spacing)*4)]"
		>
			<caps-sidebar
				sidebarContainerClass="text-sidebar-foreground sticky top-[calc(var(--header-height)+1px)] z-(--caps-z-30) hidden h-[calc(100svh-var(--footer-height)+2rem-var(--stable-height))] w-(--sidebar-width) flex-col border-r-transparent bg-transparent lg:flex"
			>
				<caps-sidebar-content class="no-scrollbar bg-background overflow-x-hidden px-2 pb-12">
					<div class="h-(--top-spacing) shrink-0"></div>

					@for (item of _items; track item.label) {
						<caps-sidebar-group class="px-0">
							<caps-sidebar-group-label class="text-muted-foreground font-medium">
								{{ item.label }}
							</caps-sidebar-group-label>
							<caps-sidebar-group-content>
								<caps-sidebar-menu>
									@for (link of item.links; track link.url) {
										<caps-sidebar-menu-item>
											@if (link.wip) {
												<button disabled capsSidebarMenuButton class="text-[0.8rem] font-medium">
													<span>
														{{ link.label }}
													</span>
													<span class="text-muted-foreground text-xs">(soon)</span>
												</button>
											} @else {
												<a
													capsSidebarMenuButton
													[routerLink]="item.url + link.url"
													[routerLinkActive]="['bg-accent', 'border-accent']"
													[routerLinkActiveOptions]="{ exact: link.exact || false }"
													class="text-[0.8rem] font-medium"
												>
													<span class="inline-flex items-center gap-2">
														{{ link.label }}
														@if (link.new) {
															<span spartanNewMarker></span>
														}
													</span>
												</a>
											}
										</caps-sidebar-menu-item>
									}
								</caps-sidebar-menu>
							</caps-sidebar-group-content>
						</caps-sidebar-group>
					}
				</caps-sidebar-content>
			</caps-sidebar>
			<ng-content />
		</caps-sidebar-wrapper>
	`,
})
export class SideNav {
	protected readonly _items = sidenavItems;
}
