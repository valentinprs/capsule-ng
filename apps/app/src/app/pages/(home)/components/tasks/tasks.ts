import { Component, inject, signal, type TrackByFunction } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsLabel } from '@capsule-ng/caps/label';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { CapsTableImports } from '@capsule-ng/caps/table';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
	lucideArrowUpDown,
	lucideChevronDown,
	lucideChevronLeft,
	lucideChevronRight,
	lucideChevronsLeft,
	lucideChevronsRight,
	lucideChevronsUp,
	lucideChevronUp,
	lucideCircle,
	lucideCircleCheckBig,
	lucideCircleDashed,
	lucideCircleDot,
	lucideCircleHelp,
	lucideCircleOff,
	lucideCog,
	lucideDot,
	lucideEllipsis,
	lucideLayers,
	lucideLoader,
	lucideLogOut,
	lucideUser,
} from '@ng-icons/lucide';
import {
	columnFilteringFeature,
	type ColumnFiltersState,
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
	rowSortingFeature,
	sortFn_alphanumeric,
	sortFn_text,
	type SortingState,
	tableFeatures,
} from '@tanstack/angular-table';
import { TableHeadSelection, TableRowSelection } from '../../../(components)/components/(data-table)/selection-column';
import { TableHeadSortButton } from '../../../(components)/components/(data-table)/sort-header-button';
import { ActionDropdown } from './components/action-dropdown';
import { PriorityIconCell } from './components/priority-icon-cell';
import { StatusIconCell } from './components/status-icon-cell';
import { TableActions } from './components/table-actions';
import { TitleCell } from './components/title-cell';
import { DEFAULT_TASK_TABLE_COLUMNS, LocalStorageService } from './services/local-storage.service';
import { type Task, TASK_DATA } from './services/tasks.models';

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

export type TaskFeatures = typeof features;

const columnHelper = createColumnHelper<TaskFeatures, Task>();

const columns = columnHelper.columns([
	columnHelper.display({
		id: 'select',
		header: () => TableHeadSelection,
		cell: () => TableRowSelection,
		enableHiding: false,
	}),
	columnHelper.accessor('id', {
		id: 'id',
		header: () => TableHeadSortButton,
	}),
	columnHelper.accessor('title', {
		id: 'title',
		header: () => TableHeadSortButton,
		cell: () => TitleCell,
	}),
	columnHelper.accessor('status', {
		id: 'status',
		filterFn: 'arrHas',
		header: () => TableHeadSortButton,
		cell: () => StatusIconCell,
	}),
	columnHelper.accessor('priority', {
		id: 'priority',
		filterFn: 'arrHas',
		header: () => TableHeadSortButton,
		cell: () => PriorityIconCell,
	}),
	columnHelper.display({
		id: 'actions',
		cell: () => ActionDropdown,
		enableHiding: false,
	}),
]);
@Component({
	selector: 'spartan-tasks-example',
	imports: [
		FormsModule,
		CapsDropdownMenuImports,
		CapsTableImports,
		CapsButtonImports,
		CapsSelectImports,
		TableActions,
		NgIcon,
		CapsAvatarImports,
		FlexRender,
		CapsLabel,
	],
	providers: [
		provideIcons({
			lucideArrowUpDown,
			lucideChevronDown,
			lucideChevronLeft,
			lucideChevronRight,
			lucideChevronUp,
			lucideChevronsUp,
			lucideCircle,
			lucideCircleCheckBig,
			lucideCircleDashed,
			lucideCircleDot,
			lucideCircleHelp,
			lucideCircleOff,
			lucideCog,
			lucideDot,
			lucideEllipsis,
			lucideLayers,
			lucideLogOut,
			lucideUser,
			lucideChevronsRight,
			lucideChevronsLeft,
			lucideLoader,
		}),
	],
	host: {
		class: 'w-full',
	},
	template: `
		<div class="md:hidden">
			<img src="/assets/tasks-light.png" alt="Tasks" class="block dark:hidden" />
			<img src="/assets/tasks-dark.png" alt="Tasks" class="hidden dark:block" />
		</div>
		<div class="hidden h-full flex-1 flex-col space-y-4 rounded-lg border p-8 py-6 md:flex">
			<div class="flex items-center justify-between space-y-2">
				<div class="flex flex-col">
					<h2 class="text-2xl font-bold tracking-tight">Welcome back!</h2>
					<p class="text-muted-foreground">Here's a list of your tasks for this month!</p>
				</div>
				<button
					capsButton
					variant="ghost"
					size="icon"
					[capsDropdownMenuTrigger]="profile"
					placement="bottom-end"
					aria-label="Open profile menu"
				>
					<caps-avatar>
						<img src="/assets/avatar.png" alt="spartan logo. Resembling a spartanic shield" capsAvatarImage />
						<caps-avatar-fallback class="bg-red-700 text-white">KL</caps-avatar-fallback>
					</caps-avatar>
				</button>
				<ng-template #profile>
					<caps-menu class="min-w-56">
						<caps-menu-label class="flex flex-col items-start gap-1">
							<p class="text-sm leading-none font-medium">spartan</p>
							<p class="text-muted-foreground text-xs leading-none">m&#64;example.com</p>
						</caps-menu-label>
						<caps-menu-separator />
						<caps-menu-group>
							<caps-menu-group>
								<button capsMenuItem>
									<ng-icon name="lucideUser" />
									<span>Profile</span>
									<caps-menu-shortcut>⇧⌘P</caps-menu-shortcut>
								</button>
								<button capsMenuItem>
									<ng-icon name="lucideLayers" />
									<span>Billing</span>
									<caps-menu-shortcut>⌘B</caps-menu-shortcut>
								</button>
								<button capsMenuItem>
									<ng-icon name="lucideCog" />
									<span>Settings</span>
									<caps-menu-shortcut>⌘S</caps-menu-shortcut>
								</button>
							</caps-menu-group>
							<caps-menu-separator />
							<button capsMenuItem>
								<ng-icon name="lucideLogOut" />
								<span>Logout</span>
								<caps-menu-shortcut>⇧⌘Q</caps-menu-shortcut>
							</button>
						</caps-menu-group>
					</caps-menu>
				</ng-template>
			</div>
			<spartan-table-actions table="table" />
			<div class="max-h-[700px] w-full overflow-auto rounded-md border">
				<caps-table-container>
					<table capsTable>
						<thead class="bg-background sticky top-0 z-(--caps-z-10)">
							@for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
								<tr>
									@for (header of headerGroup.headers; track header.id) {
										<th scope="col" [attr.colSpan]="header.colSpan">
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
								<tr [attr.key]="row.id" [attr.data-state]="row.getIsSelected() && 'selected'">
									@for (cell of row.getVisibleCells(); track $index) {
										<td>
											<ng-container *flexRender="cell.column.columnDef.cell; props: cell.getContext(); let cell">
												<div [innerHTML]="cell"></div>
											</ng-container>
										</td>
									}
								</tr>
							} @empty {
								<tr>
									<td class="h-24 text-center" [attr.colspan]="_columns.length">No results.</td>
								</tr>
							}
						</tbody>
					</table>
				</caps-table-container>
			</div>
			<div class="mt-4 flex flex-col justify-between sm:flex-row sm:items-center">
				<span class="text-muted-foreground text-sm">
					{{ table.getSelectedRowModel().rows.length }} of {{ table.getRowCount() }} row(s) selected
				</span>
				<div class="mt-2 flex gap-8 sm:mt-0">
					<div class="flex gap-2">
						<label capsLabel for="tasks-page-size">Rows per page:</label>
						<caps-select
							id="tasks-page-size"
							[ngModel]="table.atoms.pagination.get().pageSize"
							(ngModelChange)="table.setPageSize($event); table.resetPageIndex()"
							placeholder="{{ _availablePageSizes[0] }}"
							size="sm"
							class="mr-1 inline-flex h-8 w-fit"
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
							(click)="table.firstPage()"
						>
							<ng-icon name="lucideChevronsLeft" />
						</button>
						<button
							size="icon-sm"
							variant="outline"
							capsButton
							[disabled]="!table.getCanPreviousPage()"
							(click)="table.previousPage()"
						>
							<ng-icon name="lucideChevronLeft" />
						</button>
						<button
							size="icon-sm"
							variant="outline"
							capsButton
							[disabled]="!table.getCanNextPage()"
							(click)="table.nextPage()"
						>
							<ng-icon name="lucideChevronRight" />
						</button>
						<button
							size="icon-sm"
							variant="outline"
							capsButton
							[disabled]="!table.getCanNextPage()"
							(click)="table.lastPage()"
						>
							<ng-icon name="lucideChevronsRight" />
						</button>
					</div>
				</div>
			</div>
		</div>
	`,
})
export class TasksExample {
	protected readonly _columns = columns;

	protected readonly trackBy: TrackByFunction<Task> = (_: number, p: Task) => p.id;
	protected readonly _availablePageSizes = [5, 10, 20, 10000];
	protected readonly _pageSize = signal(this._availablePageSizes[1]); // default to page size 10
	private readonly _localStorageService = inject(LocalStorageService);

	constructor() {
		const cols = this._localStorageService.getTaskTableColumns();
		this._visibility.set(cols as ColumnVisibilityState);
	}

	private readonly _visibility = signal<ColumnVisibilityState>(DEFAULT_TASK_TABLE_COLUMNS);
	private readonly _columnFilters = signal<ColumnFiltersState>([]);
	private readonly _sorting = signal<SortingState>([]);
	private readonly _pagination = signal<PaginationState>({
		pageSize: 20,
		pageIndex: 0,
	});

	public readonly table = injectTable(() => ({
		features,
		columns,
		data: TASK_DATA,
		state: {
			columnFilters: this._columnFilters(),
			sorting: this._sorting(),
			pagination: this._pagination(),
			columnVisibility: this._visibility(),
		},
		onColumnVisibilityChange: (updater) => {
			updater instanceof Function ? this._visibility.update(updater) : this._visibility.set(updater);
			this._localStorageService.saveTaskTableColumns(this._visibility());
		},
		onColumnFiltersChange: (updater) => {
			updater instanceof Function ? this._columnFilters.update(updater) : this._columnFilters.set(updater);
		},
		onSortingChange: (updater) => {
			updater instanceof Function ? this._sorting.update(updater) : this._sorting.set(updater);
		},
		onPaginationChange: (updater) => {
			updater instanceof Function ? this._pagination.update(updater) : this._pagination.set(updater);
		},
		initialState: {
			pagination: { pageIndex: 0, pageSize: 20 },
		},
	}));
}
