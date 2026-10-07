import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsTableImports } from '@capsule-ng/caps/table';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { hlmMuted } from '@spartan-ng/helm/typography';
import {
	columnFilteringFeature,
	type ColumnFiltersState,
	columnVisibilityFeature,
	type ColumnVisibilityState,
	createColumnHelper,
	createFilteredRowModel,
	createPaginatedRowModel,
	createSortedRowModel,
	filterFn_includesString,
	FlexRender,
	injectTable,
	rowPaginationFeature,
	rowSelectionFeature,
	type RowSelectionState,
	rowSortingFeature,
	sortFn_alphanumeric,
	sortFn_text,
	type SortingState,
	tableFeatures,
} from '@tanstack/angular-table';
import { ActionDropdown } from './action-dropdown';
import { TableHeadSelection, TableRowSelection } from './selection-column';
import { TableHeadSortButton } from './sort-header-button';

export type Payment = {
	id: string;
	amount: number;
	status: 'pending' | 'processing' | 'success' | 'failed';
	email: string;
};

const features = tableFeatures({
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

export type DataTableFeatures = typeof features;

const columnHelper = createColumnHelper<DataTableFeatures, Payment>();

const columns = columnHelper.columns([
	columnHelper.display({
		id: 'select',
		header: () => TableHeadSelection,
		cell: () => TableRowSelection,
		enableHiding: false,
	}),
	columnHelper.accessor('status', {
		id: 'status',
		header: 'Status',
		cell: (info) => `<span class="capitalize">${info.getValue<string>()}</span>`,
	}),
	columnHelper.accessor('email', {
		id: 'email',
		header: () => TableHeadSortButton,
		cell: (info) => `<div class="lowercase">${info.getValue<string>()}</div>`,
	}),
	columnHelper.accessor('amount', {
		id: 'amount',
		header: '<div class="text-right">Amount</div>',
		cell: (info) => {
			const amount = parseFloat(info.getValue<string>());
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount);

			return `<div class="text-right font-medium">${formatted}</div>`;
		},
	}),
	columnHelper.display({
		id: 'actions',
		cell: () => ActionDropdown,
		enableHiding: false,
	}),
]);

@Component({
	selector: 'spartan-data-table-preview',
	imports: [
		FlexRender,
		FormsModule,
		CapsDropdownMenuImports,
		CapsButtonImports,
		NgIcon,

		HlmInputImports,
		CapsTableImports,
	],
	providers: [provideIcons({ lucideChevronDown })],
	host: {
		class: 'w-full',
	},
	template: `
		<div class="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center">
			<input hlmInput class="w-full md:w-80" placeholder="Filter emails..." (input)="_filterChanged($event)" />

			<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu" placement="bottom-end">
				Columns
				<ng-icon name="lucideChevronDown" class="ml-2" />
			</button>
			<ng-template #menu>
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
		<div class="overflow-hidden rounded-md border">
			<caps-table-container>
				<table capsTable>
					<thead>
						@for (headerGroup of _table.getHeaderGroups(); track headerGroup.id) {
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
					<tbody>
						@for (row of _table.getRowModel().rows; track row.id) {
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

		<div class="flex flex-col justify-between py-4 sm:flex-row sm:items-center">
			@if (_table.getRowCount() > 0) {
				<div class="${hlmMuted}">
					{{ _table.getSelectedRowModel().rows.length }} of {{ _table.getRowCount() }} row(s) selected
				</div>
				<div class="mt-2 flex space-x-2 sm:mt-0">
					<button
						size="sm"
						variant="outline"
						capsButton
						[disabled]="!_table.getCanPreviousPage()"
						(click)="_table.previousPage()"
					>
						Previous
					</button>
					<button
						size="sm"
						variant="outline"
						capsButton
						[disabled]="!_table.getCanNextPage()"
						(click)="_table.nextPage()"
					>
						Next
					</button>
				</div>
			} @else {
				<div class="flex h-full w-full items-center justify-center">
					<div class="text-muted-foreground text-sm">No Data</div>
				</div>
			}
		</div>
	`,
})
export class DataTablePreview {
	protected readonly _columns = columns;

	private readonly _columnFilters = signal<ColumnFiltersState>([]);
	private readonly _sorting = signal<SortingState>([]);
	private readonly _rowSelection = signal<RowSelectionState>({});
	private readonly _columnVisibility = signal<ColumnVisibilityState>({});

	protected readonly _table = injectTable(() => ({
		features,
		columns,
		data: PAYMENT_DATA,
		onSortingChange: (updater) => {
			updater instanceof Function ? this._sorting.update(updater) : this._sorting.set(updater);
		},
		onColumnFiltersChange: (updater) => {
			updater instanceof Function ? this._columnFilters.update(updater) : this._columnFilters.set(updater);
		},
		onColumnVisibilityChange: (updater) => {
			updater instanceof Function ? this._columnVisibility.update(updater) : this._columnVisibility.set(updater);
		},
		onRowSelectionChange: (updater) => {
			updater instanceof Function ? this._rowSelection.update(updater) : this._rowSelection.set(updater);
		},
		state: {
			sorting: this._sorting(),
			columnFilters: this._columnFilters(),
			columnVisibility: this._columnVisibility(),
			rowSelection: this._rowSelection(),
		},
	}));
	protected readonly _hidableColumns = this._table.getAllColumns().filter((column) => column.getCanHide());

	protected _filterChanged(event: Event) {
		this._table.getColumn('email')?.setFilterValue((event.target as HTMLInputElement).value);
	}
}

const PAYMENT_DATA: Payment[] = [
	{
		id: 'm5gr84i9',
		amount: 316,
		status: 'success',
		email: 'ken99@yahoo.com',
	},
	{
		id: '3u1reuv4',
		amount: 242,
		status: 'success',
		email: 'Abe45@gmail.com',
	},
	{
		id: 'derv1ws0',
		amount: 837,
		status: 'processing',
		email: 'Monserrat44@gmail.com',
	},
	{
		id: '5kma53ae',
		amount: 874,
		status: 'success',
		email: 'Silas22@gmail.com',
	},
	{
		id: 'bhqecj4p',
		amount: 721,
		status: 'failed',
		email: 'carmella@hotmail.com',
	},
];
