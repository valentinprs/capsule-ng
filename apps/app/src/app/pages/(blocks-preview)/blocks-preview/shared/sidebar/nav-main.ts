import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookOpen, lucideBot, lucideChevronRight, lucideSettings2, lucideSquareTerminal } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-nav-main',
	imports: [CapsSidebarImports, NgIcon, CapsCollapsibleImports, RouterLink],
	providers: [provideIcons({ lucideSquareTerminal, lucideBot, lucideBookOpen, lucideSettings2, lucideChevronRight })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sidebar-group>
			<caps-sidebar-group-label>Platform</caps-sidebar-group-label>
			<caps-sidebar-menu>
				@for (item of items(); track $index) {
					<caps-sidebar-menu-item>
						<caps-collapsible [expanded]="item.isActive ?? false">
							<a capsSidebarMenuButton [routerLink]="item.url">
								<ng-icon aria-hidden="true" [name]="item.icon" />
								{{ item.title }}
							</a>
							@if (item.items; as subItems) {
								<button capsCollapsibleTrigger capsSidebarMenuAction class="data-[state=open]:rotate-90">
									<ng-icon aria-hidden="true" name="lucideChevronRight" />
									<span class="sr-only">Toggle {{ item.title }}</span>
								</button>
								<caps-collapsible-content>
									<caps-sidebar-menu-sub>
										@for (subItem of subItems; track $index) {
											<caps-sidebar-menu-sub-item>
												<a capsSidebarMenuSubButton [routerLink]="subItem.url">{{ subItem.title }}</a>
											</caps-sidebar-menu-sub-item>
										}
									</caps-sidebar-menu-sub>
								</caps-collapsible-content>
							}
						</caps-collapsible>
					</caps-sidebar-menu-item>
				}
			</caps-sidebar-menu>
		</caps-sidebar-group>
	`,
})
export class NavMain {
	public readonly items = input.required<
		{
			title: string;
			url: string;
			icon: string;
			isActive?: boolean;
			items?: {
				title: string;
				url: string;
			}[];
		}[]
	>();
}
