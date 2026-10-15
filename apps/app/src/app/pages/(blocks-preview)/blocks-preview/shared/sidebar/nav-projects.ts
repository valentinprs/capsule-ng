import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsDropdownMenuImports, type CapsMenuPlacement } from '@capsule-ng/caps/dropdown-menu';
import { CapsSidebarImports, CapsSidebarService } from '@capsule-ng/caps/sidebar';
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

@Component({
	selector: 'spartan-nav-projects',
	imports: [CapsSidebarImports, NgIcon, RouterLink, CapsDropdownMenuImports],
	providers: [
		provideIcons({ lucideFrame, lucideChartPie, lucideMap, lucideEllipsis, lucideFolder, lucideShare, lucideTrash2 }),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-sidebar-group>
			<caps-sidebar-group-label>Projects</caps-sidebar-group-label>
			<caps-sidebar-menu>
				@for (project of projects(); track $index) {
					<caps-sidebar-menu-item>
						<a capsSidebarMenuButton [routerLink]="project.url">
							<ng-icon aria-hidden="true" [name]="project.icon" />
							{{ project.name }}
						</a>
						<button
							capsSidebarMenuAction
							showOnHover
							[capsDropdownMenuTrigger]="menu"
							[capsDropdownMenuTriggerData]="{ $implicit: { project } }"
							[placement]="_menuPlacement()"
						>
							<ng-icon aria-hidden="true" name="lucideEllipsis" />
							<span class="sr-only">More</span>
						</button>
					</caps-sidebar-menu-item>
				}
				<caps-sidebar-menu-item>
					<button capsSidebarMenuButton>
						<ng-icon aria-hidden="true" name="lucideEllipsis" />
						More
					</button>
				</caps-sidebar-menu-item>
			</caps-sidebar-menu>
		</caps-sidebar-group>

		<ng-template #menu let-ctx>
			<caps-menu class="w-48">
				<caps-menu-label>{{ ctx.project.name }}</caps-menu-label>
				<caps-menu-separator />
				<button capsMenuItem>
					<ng-icon aria-hidden="true" name="lucideFolder" />
					View Project
				</button>
				<button capsMenuItem>
					<ng-icon aria-hidden="true" name="lucideShare" />
					Share Project
				</button>
				<caps-menu-separator />
				<button capsMenuItem>
					<ng-icon aria-hidden="true" name="lucideTrash2" />
					Delete Project
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class NavProjects {
	protected readonly _menuPlacement = computed<CapsMenuPlacement>(() => `${this._menuSide()}-${this._menuAlign()}`);
	private readonly _sidebarService = inject(CapsSidebarService);
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
