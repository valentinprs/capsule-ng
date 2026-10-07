import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideEllipsis } from '@ng-icons/lucide';
import { type Row } from '@tanstack/angular-table';
import { type DashboardData } from './dashboard-data.model';
import { type DashboardFeatures } from './table-section';

@Component({
	selector: 'spartan-action-dropdown-dashboard',
	imports: [CapsButton, NgIcon, CapsDropdownMenuImports],
	providers: [provideIcons({ lucideEllipsis, lucideChevronRight })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button
			capsButton
			variant="ghost"
			size="icon-sm"
			[capsDropdownMenuTrigger]="menu"
			placement="bottom-end"
			[attr.aria-label]="'Actions for ' + _data().header"
		>
			<ng-icon name="lucideEllipsis" />
		</button>
		<ng-template #menu>
			<caps-menu>
				<caps-menu-group>
					<button capsMenuItem>Edit</button>
					<button capsMenuItem>Make a copy</button>
					<button capsMenuItem>Favorite</button>
				</caps-menu-group>
				<caps-menu-separator />
				<button capsMenuItem>
					Delete
					<span class="ml-auto text-xs tracking-widest opacity-(--caps-opacity-60)">⌘⌫</span>
				</button>
			</caps-menu>
		</ng-template>
	`,
})
export class ActionDropdown {
	public readonly row = input.required<Row<DashboardFeatures, DashboardData>>();

	protected readonly _data = computed(() => this.row().original);
}
