import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsCollapsibleImports } from '@capsule-ng/caps/collapsible';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBookOpen, lucideBot, lucideChevronRight, lucideSettings2, lucideSquareTerminal } from '@ng-icons/lucide';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
	selector: 'spartan-nav-main',
	imports: [HlmSidebarImports, NgIcon, CapsCollapsibleImports, RouterLink],
	providers: [provideIcons({ lucideSquareTerminal, lucideBot, lucideBookOpen, lucideSettings2, lucideChevronRight })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<hlm-sidebar-group>
			<div hlmSidebarGroupLabel>Platform</div>
			<ul hlmSidebarMenu>
				@for (item of items(); track $index) {
					<li hlmSidebarMenuItem>
						<caps-collapsible [expanded]="item.isActive ?? false">
							<a hlmSidebarMenuButton [routerLink]="item.url">
								<ng-icon [name]="item.icon" />
								{{ item.title }}
							</a>
							@if (item.items; as subItems) {
								<button capsCollapsibleTrigger hlmSidebarMenuAction class="data-[state=open]:rotate-90">
									<ng-icon name="lucideChevronRight" />
									<span class="sr-only">Toggle {{ item.title }}</span>
								</button>
								<caps-collapsible-content>
									<ul hlmSidebarMenuSub>
										@for (subItem of subItems; track $index) {
											<li hlmSidebarMenuSubItem>
												<a hlmSidebarMenuSubButton [routerLink]="subItem.url">{{ subItem.title }}</a>
											</li>
										}
									</ul>
								</caps-collapsible-content>
							}
						</caps-collapsible>
					</li>
				}
			</ul>
		</hlm-sidebar-group>
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
