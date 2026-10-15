import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronDown, tablerColumns2, tablerPlus } from '@ng-icons/tabler-icons';
import { DashboardTableSection } from './table-section';

@Component({
	selector: 'spartan-dashboard-table-actions',

	imports: [CapsButton, NgIcon, CapsDropdownMenuImports],
	providers: [
		provideIcons({
			tablerChevronDown,
			tablerColumns2,
			tablerPlus,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'block',
	},
	template: `
		<div class="wip-table-search flex flex-col justify-between gap-2 sm:flex-row">
			<button capsButton variant="outline" size="sm" [capsDropdownMenuTrigger]="columns" placement="bottom-end">
				<ng-icon name="tablerColumns2" />
				Customize Columns
				<ng-icon name="tablerChevronDown" />
			</button>
			<button capsButton variant="outline" align="end" size="sm">
				<ng-icon name="tablerPlus" />
				Add section
			</button>
			<ng-template #columns>
				<caps-menu class="w-32">
					@for (column of _hidableColumns; track column.id) {
						<button
							capsMenuCheckboxItem
							class="capitalize"
							[checked]="column.getIsVisible()"
							(itemClick)="column.toggleVisibility()"
						>
							{{ column.columnDef.id }}
						</button>
					}
				</caps-menu>
			</ng-template>
		</div>
	`,
})
export class DashboardTableActions {
	private readonly _tableComponent = inject(DashboardTableSection);
	protected readonly _table = this._tableComponent.table;
	protected readonly _hidableColumns = this._table.getAllColumns().filter((column) => column.getCanHide());
}
