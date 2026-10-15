import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsSidebarImports } from '@capsule-ng/caps/sidebar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLifeBuoy, lucideSend } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-nav-secondary',
	imports: [CapsSidebarImports, NgIcon, RouterLink],
	providers: [provideIcons({ lucideLifeBuoy, lucideSend })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sidebar-group>
			<caps-sidebar-group-content>
				<caps-sidebar-menu>
					@for (item of items(); track $index) {
						<caps-sidebar-menu-item>
							<a capsSidebarMenuButton size="sm" [routerLink]="item.url">
								<ng-icon aria-hidden="true" [name]="item.icon" />
								{{ item.title }}
							</a>
						</caps-sidebar-menu-item>
					}
				</caps-sidebar-menu>
			</caps-sidebar-group-content>
		</caps-sidebar-group>
	`,
})
export class NavSecondary {
	public readonly items = input.required<
		{
			title: string;
			url: string;
			icon: string;
		}[]
	>();
}
