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
			aria-label="Select all"
			[checked]="table().getIsAllRowsSelected()"
			[indeterminate]="table().getIsSomeRowsSelected() && !table().getIsAllPageRowsSelected()"
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
			aria-label="Select row"
			[checked]="row().getIsSelected()"
			(checkedChange)="row().toggleSelected($event)"
		/>
	`,
})
export class TableRowSelection {
	public readonly row = input.required<Row<DataTableFeatures, Payment>>();
}
