import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { CapsTableImports } from '@capsule-ng/caps/table';
import { CapsTabsImports } from '@capsule-ng/caps/tabs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerChevronLeft, tablerChevronRight, tablerChevronsLeft, tablerChevronsRight } from '@ng-icons/tabler-icons';
import {
	columnFilteringFeature,
	ColumnFiltersState,
	columnVisibilityFeature,
	type ColumnVisibilityState,
	createColumnHelper,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	filterFn_arrHas,
	filterFn_includesString,
	FlexRender,
	injectTable,
	type PaginationState,
	rowPaginationFeature,
	rowSelectionFeature,
	type RowSelectionState,
	rowSortingFeature,
	sortFn_alphanumeric,
	sortFn_text,
	type SortingState,
	tableFeatures,
} from '@tanstack/angular-table';
import {
	TableHeadSelection,
	TableRowSelection,
} from '../../../../(components)/components/(data-table)/selection-column';
import { TableHeadSortButton } from '../../../../(components)/components/(data-table)/sort-header-button';
import {
	DashboardLocalStorageService,
	DEFAULT_DASHBOARD_TABLE_COLUMNS,
} from '../services/dashboard-local-storage.service';
import { ActionDropdown } from './action-dropdown';
import { DASHBOARD_DATA, DashboardData } from './dashboard-data.model';
import { DashboardTableActions } from './dashboard-table-action';
import { HeaderCell } from './header-cell';
import { LimitCell } from './limit-cell';
import { ReviewerCell } from './reviewer-cell';
import { StatusCell } from './status-cell';
import { TargetCell } from './target-cell';
import { TypeCell } from './type-cell';

const features = tableFeatures({
	columnFilteringFeature,
	columnVisibilityFeature,
	rowPaginationFeature,
	rowSelectionFeature,
	rowSortingFeature,
	filteredRowModel: createFilteredRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	sortedRowModel: createSortedRowModel(),
	filterFns: { includesString: filterFn_includesString, arrHas: filterFn_arrHas },
	sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});

export type DashboardFeatures = typeof features;

const columnHelper = createColumnHelper<DashboardFeatures, DashboardData>();

const columns = columnHelper.columns([
	columnHelper.display({
		id: 'select',
		header: () => TableHeadSelection,
		cell: () => TableRowSelection,
		enableHiding: false,
	}),
	columnHelper.accessor('header', {
		id: 'header',
		header: 'Header',
		cell: () => HeaderCell,
	}),
	columnHelper.accessor('type', {
		id: 'type',
		header: 'Type',
		filterFn: 'arrHas',
		cell: () => TypeCell,
	}),
	columnHelper.accessor('status', {
		id: 'status',
		header: 'Status',
		filterFn: 'arrHas',
		cell: () => StatusCell,
	}),
	columnHelper.accessor('target', {
		id: 'target',
		filterFn: 'arrHas',
		header: () => TableHeadSortButton,
		cell: () => TargetCell,
	}),
	columnHelper.accessor('limit', {
		id: 'limit',
		filterFn: 'arrHas',
		header: () => TableHeadSortButton,
		cell: () => LimitCell,
	}),
	columnHelper.accessor('reviewer', {
		id: 'reviewer',
		header: 'Reviewer',
		filterFn: 'arrHas',
		cell: () => ReviewerCell,
	}),
	columnHelper.display({
		id: 'actions',
		header: '<span class="sr-only">Actions</span>',
		enableHiding: false,
		cell: () => ActionDropdown,
	}),
]);
@Component({
	selector: 'spartan-dashboard-table-section',
	imports: [
		CapsTabsImports,
		CapsTableImports,
		CapsSelectImports,
		CapsButton,
		FormsModule,
		CapsBadgeImports,
		FlexRender,
		NgIcon,
		CapsLabel,
		DashboardTableActions,
	],
	providers: [
		provideIcons({ tablerChevronLeft, tablerChevronsLeft, tablerChevronRight, tablerChevronsRight }),
		DashboardLocalStorageService,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'px-6',
	},
	template: `
		<caps-tabs value="account" class="w-full">
			<div class="flex justify-between">
				<caps-tabs-list
					aria-label="tabs example"
					class="**:data-[slot=badge]:bg-muted-foreground/30 hidden h-9 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex"
				>
					<button capsTabsTrigger value="account">Outline</button>
					<button capsTabsTrigger value="past-performance">
						Past Performance
						<caps-badge variant="gray">3</caps-badge>
					</button>
					<button capsTabsTrigger value="key-personnel">
						Key Personnel
						<caps-badge variant="gray">2</caps-badge>
					</button>
					<button capsTabsTrigger value="focus-documents">Focus Documents</button>
				</caps-tabs-list>
				<spartan-dashboard-table-actions table="table" />
			</div>
			<caps-tabs-content value="account">
				<div class="max-h-[700px] w-full overflow-auto rounded-md border">
					@defer {
						<caps-table-container>
							<table capsTable aria-label="Dashboard items">
								<caption class="sr-only">Dashboard items</caption>
								<thead class="bg-muted sticky top-0 z-(--caps-z-10)">
									@for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
										<tr>
											@for (header of headerGroup.headers; track header.id) {
												<th
													scope="col"
													[attr.colSpan]="header.colSpan"
													[attr.aria-sort]="
														header.column.getIsSorted() === 'asc'
															? 'ascending'
															: header.column.getIsSorted() === 'desc'
																? 'descending'
																: null
													"
												>
													@if (!header.isPlaceholder) {
														<ng-container
															*flexRender="header.column.columnDef.header; props: header.getContext(); let headerText"
														>
															<div [innerHTML]="headerText"></div>
														</ng-container>
													}
												</th>
											}
										</tr>
									}
								</thead>
								<tbody class="w-full">
									@for (row of table.getRowModel().rows; track row.id) {
										<tr [attr.data-row-id]="row.id" [attr.data-state]="row.getIsSelected() && 'selected'">
											@for (cell of row.getVisibleCells(); track cell.id) {
												<td>
													<ng-container *flexRender="cell.column.columnDef.cell; props: cell.getContext(); let cell">
														<div [innerHTML]="cell"></div>
													</ng-container>
												</td>
											}
										</tr>
									} @empty {
										<tr>
											<td class="h-24 text-center" [attr.colspan]="table.getVisibleLeafColumns().length">
												No results.
											</td>
										</tr>
									}
								</tbody>
							</table>
						</caps-table-container>
					}
				</div>
				<div class="mt-4 flex flex-col justify-between sm:flex-row sm:items-center">
					<span class="text-muted-foreground text-sm" role="status">
						{{ table.getSelectedRowModel().rows.length }} of {{ table.getPreFilteredRowModel().rows.length }} row(s)
						selected; {{ table.getRowCount() }} results
					</span>
					<div class="mt-2 flex gap-8 sm:mt-0">
						<div class="flex gap-2">
							<label capsLabel for="dashboard-page-size">Rows per page:</label>
							<caps-select
								id="dashboard-page-size"
								[ngModel]="table.atoms.pagination.get().pageSize"
								(ngModelChange)="table.setPageSize($event); table.resetPageIndex()"
								placeholder="{{ _availablePageSizes[0] }}"
								size="sm"
								class="mr-1 inline-block inline-flex h-8 w-fit"
							>
								@for (size of _availablePageSizes; track size) {
									<caps-select-option [value]="size">
										{{ size === 10000 ? 'All' : size }}
									</caps-select-option>
								}
							</caps-select>
						</div>
						<span class="text-sm font-medium">
							Page {{ table.atoms.pagination.get().pageIndex + 1 }} of {{ table.getPageCount() }}
						</span>
						<div class="flex space-x-1">
							<button
								size="icon-sm"
								variant="outline"
								capsButton
								[disabled]="!table.getCanPreviousPage()"
								aria-label="Go to first page"
								(click)="table.firstPage()"
							>
								<ng-icon name="tablerChevronsLeft" />
							</button>
							<button
								size="icon-sm"
								variant="outline"
								capsButton
								[disabled]="!table.getCanPreviousPage()"
								aria-label="Go to previous page"
								(click)="table.previousPage()"
							>
								<ng-icon name="tablerChevronLeft" />
							</button>
							<button
								size="icon-sm"
								variant="outline"
								capsButton
								[disabled]="!table.getCanNextPage()"
								aria-label="Go to next page"
								(click)="table.nextPage()"
							>
								<ng-icon name="tablerChevronRight" />
							</button>
							<button
								size="icon-sm"
								variant="outline"
								capsButton
								[disabled]="!table.getCanNextPage()"
								aria-label="Go to last page"
								(click)="table.lastPage()"
							>
								<ng-icon name="tablerChevronsRight" />
							</button>
						</div>
					</div>
				</div>
			</caps-tabs-content>
			<caps-tabs-content value="past-performance">
				<div class="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
			</caps-tabs-content>
			<caps-tabs-content value="key-personnel">
				<div class="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
			</caps-tabs-content>
			<caps-tabs-content value="focus-documents">
				<div class="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
			</caps-tabs-content>
		</caps-tabs>
	`,
})
export class DashboardTableSection {
	protected readonly _columns = columns;

	private readonly _localStorageService = inject(DashboardLocalStorageService);
	private readonly _visibility = signal<ColumnVisibilityState>(DEFAULT_DASHBOARD_TABLE_COLUMNS);
	private readonly _columnFilters = signal<ColumnFiltersState>([]);
	private readonly _rowSelection = signal<RowSelectionState>({});
	private readonly _sorting = signal<SortingState>([]);
	private readonly _pagination = signal<PaginationState>({
		pageSize: 10,
		pageIndex: 0,
	});
	protected readonly _availablePageSizes = [5, 10, 20, 10000];

	constructor() {
		const cols = this._localStorageService.getTaskTableColumns();
		this._visibility.set(cols as ColumnVisibilityState);
	}

	public readonly table = injectTable(() => ({
		features,
		columns,
		data: DASHBOARD_DATA,
		getRowId: (row) => String(row.id),
		state: {
			columnFilters: this._columnFilters(),
			rowSelection: this._rowSelection(),
			sorting: this._sorting(),
			pagination: this._pagination(),
			columnVisibility: this._visibility(),
		},
		onRowSelectionChange: (updater) => {
			updater instanceof Function ? this._rowSelection.update(updater) : this._rowSelection.set(updater);
		},
		onColumnVisibilityChange: (updater) => {
			updater instanceof Function ? this._visibility.update(updater) : this._visibility.set(updater);
			this._localStorageService.saveTaskTableColumns(this._visibility());
		},
		onColumnFiltersChange: (updater) => {
			updater instanceof Function ? this._columnFilters.update(updater) : this._columnFilters.set(updater);
			this._pagination.update((state) => ({ ...state, pageIndex: 0 }));
		},
		onSortingChange: (updater) => {
			updater instanceof Function ? this._sorting.update(updater) : this._sorting.set(updater);
		},
		onPaginationChange: (updater) => {
			updater instanceof Function ? this._pagination.update(updater) : this._pagination.set(updater);
		},
		initialState: {
			pagination: {
				pageIndex: 0,
				pageSize: 10,
			},
		},
	}));
}
