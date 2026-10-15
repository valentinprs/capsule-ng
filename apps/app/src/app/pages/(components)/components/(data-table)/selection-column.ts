import { Component, input } from '@angular/core';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { type Row, type Table } from '@tanstack/angular-table';
import type { DataTableFeatures, Payment } from './data-table.preview';

@Component({
	imports: [CapsCheckboxImports],
	host: {
		class: 'flex',
	},
	template: `
		<caps-checkbox
			aria-label="Select all rows on this page"
			[checked]="table().getIsAllPageRowsSelected()"
			[indeterminate]="table().getIsSomePageRowsSelected() && !table().getIsAllPageRowsSelected()"
			[disabled]="table().getRowModel().rows.length === 0"
			(checkedChange)="table().toggleAllPageRowsSelected($event)"
		/>
	`,
})
export class TableHeadSelection {
	public readonly table = input.required<Table<DataTableFeatures, Payment>>();
}

@Component({
	imports: [CapsCheckboxImports],
	host: {
		class: 'flex',
	},
	template: `
		<caps-checkbox
			[aria-label]="'Select row ' + row().id"
			[checked]="row().getIsSelected()"
			(checkedChange)="row().toggleSelected($event)"
		/>
	`,
})
export class TableRowSelection {
	public readonly row = input.required<Row<DataTableFeatures, Payment>>();
}
