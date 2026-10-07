import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsDropdownMenuImports, type CapsMenuPlacement } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideChartPie,
	lucideEllipsis,
	lucideFolder,
	lucideFrame,
	lucideMap,
	lucideShare,
	lucideTrash2,
} from '@ng-icons/lucide';
import { HlmSidebarImports, HlmSidebarService } from '@spartan-ng/helm/sidebar';

@Component({
	selector: 'spartan-nav-projects',
	imports: [HlmSidebarImports, NgIcon, RouterLink, CapsDropdownMenuImports],
	providers: [
		provideIcons({ lucideFrame, lucideChartPie, lucideMap, lucideEllipsis, lucideFolder, lucideShare, lucideTrash2 }),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<hlm-sidebar-group>
			<div hlmSidebarGroupLabel>Projects</div>
			<ul hlmSidebarMenu>
				@for (project of projects(); track $index) {
					<li hlmSidebarMenuItem>
						<a hlmSidebarMenuButton [routerLink]="project.url">
							<ng-icon [name]="project.icon" />
							{{ project.name }}
						</a>
						<button
							hlmSidebarMenuAction
							showOnHover
							[capsDropdownMenuTrigger]="menu"
							[capsDropdownMenuTriggerData]="{ $implicit: { project } }"
							[placement]="_menuPlacement()"
						>
							<ng-icon name="lucideEllipsis" />
							<span class="sr-only">More</span>
						</button>
					</li>
				}
				<li hlmSidebarMenuItem>
					<button hlmSidebarMenuButton>
						<ng-icon name="lucideEllipsis" />
						More
					</button>
				</li>
			</ul>
		</hlm-sidebar-group>

		<ng-template #menu let-ctx>
			<caps-menu class="w-48">
				<caps-menu-label>{{ ctx.project.name }}</caps-menu-label>
				<caps-menu-separator />
				<button capsMenuItem>
					<ng-icon name="lucideFolder" />
					View Project
				</button>
				<button capsMenuItem>
					<ng-icon name="lucideShare" />
					Share Project
				</button>
				<caps-menu-separator />
				<button capsMenuItem>
					<ng-icon name="lucideTrash2" />
					Delete Project
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class NavProjects {
	protected readonly _menuPlacement = computed<CapsMenuPlacement>(() => `${this._menuSide()}-${this._menuAlign()}`);
	private readonly _sidebarService = inject(HlmSidebarService);
	protected readonly _menuSide = computed(() => (this._sidebarService.isMobile() ? 'bottom' : 'right'));
	protected readonly _menuAlign = computed(() => (this._sidebarService.isMobile() ? 'end' : 'start'));

	public readonly projects = input.required<
		{
			name: string;
			url: string;
			icon: string;
		}[]
	>();
}
