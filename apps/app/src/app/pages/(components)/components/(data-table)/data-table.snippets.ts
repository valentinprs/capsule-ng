export const paymentsCode = `
export type Payment = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};

export const payments: Payment[] = [
	{
		id: '728ed52f',
		amount: 100,
		status: 'pending',
		email: 'm@example.com',
	},
	{
		id: '489e1d42',
		amount: 125,
		status: 'processing',
		email: 'example@gmail.com',
	},
	// ...
];
`;

export const featuresCode = `
import {
	columnFilteringFeature,
	columnVisibilityFeature,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	filterFn_includesString,
	rowPaginationFeature,
	rowSelectionFeature,
	rowSortingFeature,
	sortFn_alphanumeric,
	sortFn_text,
	tableFeatures,
} from '@tanstack/angular-table';

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
export const features = tableFeatures({
	columnFilteringFeature,
	columnVisibilityFeature,
	rowPaginationFeature,
	rowSelectionFeature,
	rowSortingFeature,
	filteredRowModel: createFilteredRowModel(),
	paginatedRowModel: createPaginatedRowModel(),
	sortedRowModel: createSortedRowModel(),
	filterFns: { includesString: filterFn_includesString },
	sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
});

// Pass this as the first generic argument to \`ColumnDef\`, \`Column\`, \`Table\`
// and \`Row\` so each type knows which feature APIs are available.
export type DataTableFeatures = typeof features;
`;

export const columnsCode = `
import { createColumnHelper } from '@tanstack/angular-table';
import { type DataTableFeatures } from './data-table-features';
import { type Payment } from './payments';

// Use \`accessor\` for data columns and \`display\` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Payment>();

export const columns = columnHelper.columns([
	columnHelper.accessor('status', {
		header: 'Status',
	}),
	columnHelper.accessor('email', {
		header: 'Email',
	}),
	columnHelper.accessor('amount', {
		header: 'Amount',
	}),
]);
`;

export const basicTableCode = `
import { Component, input } from '@angular/core';
import { CapsTableImports } from '@capsule-ng/caps/table';
import { type ColumnDef, FlexRender, injectTable, type RowData } from '@tanstack/angular-table';
import { features, type DataTableFeatures } from './data-table-features';
@Component({
	selector: 'app-data-table',
	imports: [FlexRender, CapsTableImports],
	template: \`
		<div class="overflow-hidden rounded-md border">
			<caps-table-container>
				<table capsTable aria-label="Recent payments">
					<thead>
						@for (headerGroup of table.getHeaderGroups(); track headerGroup.id) {
							<tr>
								@for (header of headerGroup.headers; track header.id) {
									<th scope="col" [attr.colSpan]="header.colSpan" [attr.aria-sort]="header.column.getIsSorted() === 'asc' ? 'ascending' : header.column.getIsSorted() === 'desc' ? 'descending' : null">
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
					<tbody>
						@for (row of table.getRowModel().rows; track row.id) {
							<tr [attr.data-state]="row.getIsSelected() && 'selected'">
								@for (cell of row.getVisibleCells(); track cell.id) {
									<td>
										<ng-container *flexRender="cell.column.columnDef.cell; props: cell.getContext(); let cellText">
											<div [innerHTML]="cellText"></div>
										</ng-container>
									</td>
								}
							</tr>
						} @empty {
							<tr>
								<td class="h-24 text-center" [attr.colspan]="table.getVisibleLeafColumns().length">No results.</td>
							</tr>
						}
					</tbody>
				</table>
			</caps-table-container>
		</div>
	\`,
})
export class DataTable<TData extends RowData & { id: string | number }> {
	public readonly columns = input.required<ColumnDef<DataTableFeatures, TData>[]>();
	public readonly data = input.required<TData[]>();

	protected readonly table = injectTable(() => ({
		features,
		columns: this.columns(),
		data: this.data(),
 getRowId: (row) => String(row.id),
	}));
}
`;

export const renderTableCode = `
import { Component, signal } from '@angular/core';
import { columns } from './columns';
import { DataTable } from './data-table';
import { type Payment } from './payments';
@Component({
	selector: 'app-demo-page',
	imports: [DataTable],
	template: \`
		<div class="container mx-auto py-10">
			<app-data-table [columns]="columns" [data]="data()" />
		</div>
	\`,
})
export class DemoPage {
	protected readonly columns = columns;

	// Fetch data from your API here.
	protected readonly data = signal<Payment[]>([
		{
			id: '728ed52f',
			amount: 100,
			status: 'pending',
			email: 'm@example.com',
		},
		// ...
	]);
}
`;

export const cellFormattingCode = `
export const columns = columnHelper.columns([
	columnHelper.accessor('amount', {
		header: '<div class="text-right">Amount</div>',
		cell: (info) => {
			const amount = parseFloat(info.getValue<string>());
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);

			return \`<div class="text-right font-medium">\${formatted}</div>\`;
		},
	}),
]);
`;

export const actionDropdownCode = `
import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEllipsis } from '@ng-icons/lucide';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import type { Row } from '@tanstack/angular-table';
import { type DataTableFeatures } from './data-table-features';
import { type Payment } from './payments';
@Component({
	selector: 'app-action-dropdown',
	imports: [CapsButtonImports, NgIcon, CapsDropdownMenuImports],
	providers: [provideIcons({ lucideEllipsis })],
	template: \`
		<button capsButton size="icon-sm" variant="ghost" [capsDropdownMenuTrigger]="ActionDropDownMenu">
			<span class="sr-only">Open menu for payment {{ row().id }}</span>
			<ng-icon name="lucideEllipsis" />
		</button>
		<ng-template #ActionDropDownMenu>
			<caps-menu>
				<caps-menu-label>Actions</caps-menu-label>
				<button capsMenuItem (itemClick)="copyPaymentId()">Copy payment ID</button>
				<caps-menu-separator />
				<button capsMenuItem>View customer</button>
				<button capsMenuItem>View payment details</button>
			</caps-menu>
		</ng-template>
	\`,
})
export class ActionDropdown {
	public readonly row = input.required<Row<DataTableFeatures, Payment>>();

	copyPaymentId() {
		const payment = this.row().original;
		navigator.clipboard.writeText(payment.id);
	}
}
`;

export const rowActionsColumnCode = `
import { ActionDropdown } from './action-dropdown';

export const columns = columnHelper.columns([
	// ...
	columnHelper.display({
		id: 'actions',
 header: '<span class="sr-only">Actions</span>',
		cell: () => ActionDropdown,
		enableHiding: false,
	}),
]);
`;

export const paginationCode = `
import { CapsButtonImports } from '@capsule-ng/caps/button';
@Component({
	selector: 'app-data-table',
	imports: [FlexRender, CapsButtonImports, CapsTableImports],
	template: \`
		<div class="overflow-hidden rounded-md border">
			<!-- table -->
		</div>
		<div class="flex items-center justify-end space-x-2 py-4">
			<button
				capsButton
				variant="outline"
				size="sm"
				[disabled]="!table.getCanPreviousPage()"
				(click)="table.previousPage()"
			>
				Previous
			</button>
			<button capsButton variant="outline" size="sm" [disabled]="!table.getCanNextPage()" (click)="table.nextPage()">
				Next
			</button>
		</div>
	\`,
})
export class DataTable<TData extends RowData & { id: string | number }> {
	// ...
}
`;

export const sortingStateCode = `
import { Component, input, signal } from '@angular/core';
import { injectTable, isFunction, type SortingState } from '@tanstack/angular-table';

export class DataTable<TData extends RowData & { id: string | number }> {
	private readonly _sorting = signal<SortingState>([]);

	protected readonly table = injectTable(() => ({
		features,
		columns: this.columns(),
		data: this.data(),
 getRowId: (row) => String(row.id),
		onSortingChange: (updater) => (isFunction(updater) ? this._sorting.update(updater) : this._sorting.set(updater)),
		state: {
			sorting: this._sorting(),
		},
	}));
}
`;

export const sortHeaderButtonCode = `
import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpDown } from '@ng-icons/lucide';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { type Column } from '@tanstack/angular-table';
import { type DataTableFeatures } from './data-table-features';
import { type Payment } from './payments';
@Component({
	imports: [CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideArrowUpDown })],
	template: \`
		<button capsButton size="sm" variant="ghost" class="capitalize" (click)="sortClick()">
			{{ column().id }}
			<ng-icon name="lucideArrowUpDown" />
		</button>
	\`,
})
export class TableHeadSortButton {
	public readonly column = input.required<Column<DataTableFeatures, Payment, unknown>>();

	protected sortClick() {
		this.column().toggleSorting(this.column().getIsSorted() === 'asc');
	}
}
`;

export const sortingColumnCode = `
import { TableHeadSortButton } from './sort-header-button';

export const columns = columnHelper.columns([
	columnHelper.accessor('email', {
		header: () => TableHeadSortButton,
		cell: (info) => \`<div class="lowercase">\${info.getValue<string>()}</div>\`,
	}),
]);
`;

export const filteringCode = `
import { Component, input, signal } from '@angular/core';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { type ColumnFiltersState, injectTable, isFunction } from '@tanstack/angular-table';
@Component({
	selector: 'app-data-table',
	imports: [FlexRender, CapsButtonImports, CapsInputImports, CapsTableImports],
	template: \`
		<div class="flex items-center py-4">
			<input capsInput class="w-full md:w-80" aria-label="Filter emails" placeholder="Filter emails..." (input)="filterChanged($event)" />
		</div>
		<div class="overflow-hidden rounded-md border">
			<!-- table -->
		</div>
	\`,
})
export class DataTable<TData extends RowData & { id: string | number }> {
	private readonly _columnFilters = signal<ColumnFiltersState>([]);

	protected readonly table = injectTable(() => ({
		features,
		columns: this.columns(),
		data: this.data(),
 getRowId: (row) => String(row.id),
		onColumnFiltersChange: (updater) =>
			isFunction(updater) ? this._columnFilters.update(updater) : this._columnFilters.set(updater),
		state: {
			columnFilters: this._columnFilters(),
		},
	}));

	protected filterChanged(event: Event) {
		this.table.getColumn('email')?.setFilterValue((event.target as HTMLInputElement).value);
 this.table.resetPageIndex();
	}
}
`;

export const visibilityCode = `
import { Component, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { type ColumnVisibilityState, injectTable, isFunction } from '@tanstack/angular-table';
@Component({
	selector: 'app-data-table',
	imports: [FlexRender, CapsButtonImports, CapsDropdownMenuImports, CapsInputImports, CapsTableImports, NgIcon],
	providers: [provideIcons({ lucideChevronDown })],
	template: \`
		<div class="flex items-center py-4">
			<!-- filter input -->
			<button capsButton variant="outline" class="ml-auto" [capsDropdownMenuTrigger]="menu" placement="bottom-end">
				Columns
				<ng-icon name="lucideChevronDown" class="ml-2" />
			</button>
			<ng-template #menu>
				<caps-menu class="w-32">
					@for (column of hidableColumns; track column.id) {
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
		<div class="overflow-hidden rounded-md border">
			<!-- table -->
		</div>
	\`,
})
export class DataTable<TData extends RowData & { id: string | number }> {
	private readonly _columnVisibility = signal<ColumnVisibilityState>({});

	protected readonly table = injectTable(() => ({
		features,
		columns: this.columns(),
		data: this.data(),
 getRowId: (row) => String(row.id),
		onColumnVisibilityChange: (updater) =>
			isFunction(updater) ? this._columnVisibility.update(updater) : this._columnVisibility.set(updater),
		state: {
			columnVisibility: this._columnVisibility(),
		},
	}));

	protected readonly hidableColumns = this.table.getAllColumns().filter((column) => column.getCanHide());
}
`;

export const selectionColumnCode = `
import { Component, input } from '@angular/core';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { type Row, type Table } from '@tanstack/angular-table';
import { type DataTableFeatures } from './data-table-features';
import { type Payment } from './payments';
@Component({
	imports: [CapsCheckboxImports],
	host: {
		class: 'flex',
	},
	template: \`
		<caps-checkbox
			aria-label="Select all rows on this page"
			[checked]="table().getIsAllPageRowsSelected()"
			[indeterminate]="table().getIsSomePageRowsSelected() && !table().getIsAllPageRowsSelected()"
 [disabled]="table().getRowModel().rows.length === 0"
			(checkedChange)="table().toggleAllPageRowsSelected($event)"
		/>
	\`,
})
export class TableHeadSelection {
	public readonly table = input.required<Table<DataTableFeatures, Payment>>();
}
@Component({
	imports: [CapsCheckboxImports],
	host: {
		class: 'flex',
	},
	template: \`
		<caps-checkbox [aria-label]="'Select row ' + row().id" [checked]="row().getIsSelected()" (checkedChange)="row().toggleSelected($event)" />
	\`,
})
export class TableRowSelection {
	public readonly row = input.required<Row<DataTableFeatures, Payment>>();
}
`;

export const rowSelectionCode = `
import { TableHeadSelection, TableRowSelection } from './selection-column';

export const columns = columnHelper.columns([
	columnHelper.display({
		id: 'select',
		header: () => TableHeadSelection,
		cell: () => TableRowSelection,
		enableHiding: false,
	}),
	// ...
]);
`;

export const rowSelectionStateCode = `
import { Component, input, signal } from '@angular/core';
import { injectTable, isFunction, type RowSelectionState } from '@tanstack/angular-table';

export class DataTable<TData extends RowData & { id: string | number }> {
	private readonly _rowSelection = signal<RowSelectionState>({});

	protected readonly table = injectTable(() => ({
		features,
		columns: this.columns(),
		data: this.data(),
 getRowId: (row) => String(row.id),
		onRowSelectionChange: (updater) =>
			isFunction(updater) ? this._rowSelection.update(updater) : this._rowSelection.set(updater),
		state: {
			rowSelection: this._rowSelection(),
		},
	}));
}
`;

export const selectedRowsCode = `
<div class="text-muted-foreground text-sm" role="status">
	{{ table.getSelectedRowModel().rows.length }} of {{ table.getPreFilteredRowModel().rows.length }} row(s) selected; {{ table.getRowCount() }} results.
</div>
`;

export const columnHeaderCode = `
import { Component, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowDown, lucideArrowUp, lucideChevronsUpDown, lucideEyeOff } from '@ng-icons/lucide';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { type Column } from '@tanstack/angular-table';
import { type DataTableFeatures } from './data-table-features';
import { type Payment } from './payments';
@Component({
	selector: 'app-data-table-column-header',
	imports: [CapsButtonImports, CapsDropdownMenuImports, NgIcon],
	providers: [provideIcons({ lucideArrowDown, lucideArrowUp, lucideChevronsUpDown, lucideEyeOff })],
	template: \`
		@if (column().getCanSort()) {
			<div class="flex items-center gap-2">
				<button
					capsButton
					variant="ghost"
					size="sm"
					class="data-[state=open]:bg-accent -ml-3 h-8"
					[capsDropdownMenuTrigger]="menu"
				 placement="bottom-start">
					<span>{{ title() }}</span>
					@switch (column().getIsSorted()) {
						@case ('desc') {
							<ng-icon name="lucideArrowDown" />
						}
						@case ('asc') {
							<ng-icon name="lucideArrowUp" />
						}
						@default {
							<ng-icon name="lucideChevronsUpDown" />
						}
					}
				</button>
				<ng-template #menu>
					<caps-menu>
						<button capsMenuItem (itemClick)="column().toggleSorting(false)">
							<ng-icon name="lucideArrowUp" />
							Asc
						</button>
						<button capsMenuItem (itemClick)="column().toggleSorting(true)">
							<ng-icon name="lucideArrowDown" />
							Desc
						</button>
						<caps-menu-separator />
						<button capsMenuItem (itemClick)="column().toggleVisibility(false)">
							<ng-icon name="lucideEyeOff" />
							Hide
						</button>
					</caps-menu>
				</ng-template>
			</div>
		} @else {
			<div>{{ title() }}</div>
		}
	\`,
})
export class DataTableColumnHeader {
	public readonly column = input.required<Column<DataTableFeatures, Payment, unknown>>();
	public readonly title = input.required<string>();
}
`;

export const columnHeaderUsageCode = `
import { flexRenderComponent } from '@tanstack/angular-table';
import { DataTableColumnHeader } from './data-table-column-header';

export const columns = columnHelper.columns([
	columnHelper.accessor('email', {
		header: ({ column }) => flexRenderComponent(DataTableColumnHeader, { inputs: { column, title: 'Email' } }),
	}),
]);
`;

export const reusablePaginationCode = `
import { Component, computed } from '@angular/core';
import { CapsPaginationImports } from '@capsule-ng/caps/pagination';
import { injectTableContext } from '@tanstack/angular-table';
@Component({
 selector: 'app-data-table-pagination',
 imports: [CapsPaginationImports],
 template: \`
  <p role="status">
   {{ table().getSelectedRowModel().rows.length }} of
   {{ table().getPreFilteredRowModel().rows.length }} row(s) selected;
   {{ table().getRowCount() }} results.
  </p>
  <caps-numbered-pagination
   [currentPage]="pagination().pageIndex + 1"
   (currentPageChange)="table().setPageIndex($event - 1)"
   [itemsPerPage]="pagination().pageSize"
   (itemsPerPageChange)="table().setPageSize($event); table().resetPageIndex()"
   [totalDataLength]="table().getRowCount()"
   [itemsPerPageOptions]="[10, 20, 25, 30, 40, 50]"
  />
 \`,
})
export class DataTablePagination {
 // Provided by the nearest [tanStackTable] directive, not a Capsule data model.
 protected readonly table = injectTableContext();
 protected readonly pagination = computed(() => this.table().atoms.pagination.get());
}
`;

export const reusablePaginationUsageCode = `
import { TanStackTable } from '@tanstack/angular-table';
import { DataTablePagination } from './data-table-pagination';
@Component({
	selector: 'app-data-table',
	imports: [DataTablePagination, FlexRender, CapsTableImports, TanStackTable],
	template: \`
		<div class="overflow-hidden rounded-md border">
			<!-- table -->
		</div>
		<div class="py-4" [tanStackTable]="table">
			<app-data-table-pagination />
		</div>
	\`,
})
export class DataTable<TData extends RowData & { id: string | number }> {
	// ...
}
`;

export const viewOptionsCode = `
import { Component, computed } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSettings2 } from '@ng-icons/lucide';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { injectTableContext } from '@tanstack/angular-table';
@Component({
	selector: 'app-data-table-view-options',
	imports: [CapsButtonImports, CapsDropdownMenuImports, NgIcon],
	providers: [provideIcons({ lucideSettings2 })],
	template: \`
		<button
			capsButton
			variant="outline"
			size="sm"
			class="ml-auto hidden h-8 lg:flex"
			[capsDropdownMenuTrigger]="menu"
		 placement="bottom-end">
			<ng-icon name="lucideSettings2" />
			View
		</button>
		<ng-template #menu>
			<caps-menu class="w-[150px]">
				<caps-menu-label>Toggle columns</caps-menu-label>
				<caps-menu-separator />
				@for (column of hidableColumns(); track column.id) {
					<button
						capsMenuCheckboxItem
						class="capitalize"
						[checked]="column.getIsVisible()"
						(itemClick)="column.toggleVisibility()"
					>
						{{ column.id }}
					</button>
				}
			</caps-menu>
		</ng-template>
	\`,
})
export class DataTableViewOptions {
	protected readonly table = injectTableContext();

	protected readonly hidableColumns = computed(() =>
		this.table()
			.getAllColumns()
			.filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide()),
	);
}
`;

export const viewOptionsUsageCode = `
<div class="flex items-center py-4" [tanStackTable]="table">
	<!-- filter input -->
	<app-data-table-view-options />
</div>
`;
