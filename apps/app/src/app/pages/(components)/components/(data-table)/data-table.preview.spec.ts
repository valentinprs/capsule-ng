import { ChangeDetectionStrategy, Component, type Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import type { PaginationState, SortingState } from '@tanstack/angular-table';
import { DashboardTableSection } from '../../../(home)/components/dashboard/components/table-section';
import { TasksExample } from '../../../(home)/components/tasks/tasks';
import { DataTableRtl } from './data-table--rtl.preview';
import { DataTablePreview } from './data-table.preview';
import { TableHeadSelection } from './selection-column';

// Exercise the actual four consumer engines without unrelated home/defer rendering.
@Component({ changeDetection: ChangeDetectionStrategy.OnPush, template: '' })
class PaymentContract extends DataTablePreview {
	public readonly table = this._table;
}
@Component({ changeDetection: ChangeDetectionStrategy.OnPush, template: '' })
class RtlContract extends DataTableRtl {
	public readonly table = this._table;
}
@Component({ changeDetection: ChangeDetectionStrategy.OnPush, template: '' })
class TaskContract extends TasksExample {}
@Component({ changeDetection: ChangeDetectionStrategy.OnPush, template: '' })
class DashboardContract extends DashboardTableSection {}

type ConsumerRow = { id: string; original: { id: string | number }; toggleSelected(value: boolean): void };
type ConsumerTable = {
	getRowModel(): { rows: ConsumerRow[] };
	getSelectedRowModel(): { rows: ConsumerRow[] };
	getColumn(id: string): { setFilterValue(value: unknown): void } | undefined;
	setPageSize(size: number): void;
	setPageIndex(index: number): void;
	setSorting(sorting: SortingState): void;
	toggleAllPageRowsSelected(value: boolean): void;
	getIsAllPageRowsSelected(): boolean;
	getIsSomePageRowsSelected(): boolean;
	atoms: { pagination: { get(): PaginationState } };
};
const scenarios: { name: string; component: Type<{ table: ConsumerTable }>; sort: string; filter: string }[] = [
	{ name: 'payments', component: PaymentContract, sort: 'email', filter: 'email' },
	{ name: 'RTL payments', component: RtlContract, sort: 'email', filter: 'email' },
	{ name: 'Tasks', component: TaskContract, sort: 'id', filter: 'title' },
	{ name: 'Dashboard', component: DashboardContract, sort: 'target', filter: 'header' },
];

describe('Data Table recipes', () => {
	beforeEach(() => localStorage.clear());
	for (const scenario of scenarios) {
		it(`${scenario.name} keeps record IDs selected through sorting, filtering and paging`, async () => {
			const fixture = TestBed.createComponent(scenario.component);
			fixture.detectChanges();
			await fixture.whenStable();
			const table = fixture.componentInstance.table;
			expect(table.getRowModel().rows.length).toBeGreaterThan(0);
			fixture.detectChanges();
			await fixture.whenStable();
			table.setPageSize(2);
			fixture.detectChanges();
			await fixture.whenStable();
			const first = table.getRowModel().rows[0];
			expect(first.id).toBe(String(first.original.id));
			first.toggleSelected(true);
			fixture.detectChanges();
			await fixture.whenStable();
			expect(table.getSelectedRowModel().rows.map((row) => row.id)).toEqual([first.id]);
			table.setSorting([{ id: scenario.sort, desc: true }]);
			table.setPageIndex(1);
			fixture.detectChanges();
			await fixture.whenStable();
			expect(table.atoms.pagination.get().pageIndex).toBe(1);
			expect(table.getSelectedRowModel().rows.map((row) => row.id)).toEqual([first.id]);
			table.getColumn(scenario.filter)?.setFilterValue('no-matching-record-xyz');
			fixture.detectChanges();
			await fixture.whenStable();
			expect(table.getRowModel().rows).toHaveLength(0);
			expect(table.atoms.pagination.get().pageIndex).toBe(0);
			expect(table.getSelectedRowModel().rows.map((row) => row.id)).toEqual([first.id]);
			table.getColumn(scenario.filter)?.setFilterValue('');
			table.setSorting([]);
			fixture.detectChanges();
			await fixture.whenStable();
			expect(table.getRowModel().rows[0].id).toBe(first.id);
			expect(table.getSelectedRowModel().rows.map((row) => String(row.original.id))).toEqual([first.id]);
		});
		it(`${scenario.name} selects the current page without altering another page`, async () => {
			const fixture = TestBed.createComponent(scenario.component);
			fixture.detectChanges();
			await fixture.whenStable();
			const table = fixture.componentInstance.table;
			expect(table.getRowModel().rows.length).toBeGreaterThan(0);
			fixture.detectChanges();
			await fixture.whenStable();
			table.setPageSize(2);
			fixture.detectChanges();
			await fixture.whenStable();
			const ids = table.getRowModel().rows.map((row) => row.id);
			expect(ids).toHaveLength(2);
			table.getRowModel().rows[0].toggleSelected(true);
			fixture.detectChanges();
			await fixture.whenStable();
			expect(table.getIsSomePageRowsSelected()).toBe(true);
			expect(table.getIsAllPageRowsSelected()).toBe(false);
			table.toggleAllPageRowsSelected(true);
			fixture.detectChanges();
			await fixture.whenStable();
			expect(table.getIsAllPageRowsSelected()).toBe(true);
			// TanStack v9's some-page predicate also stays true when every row is selected.
			expect(table.getIsSomePageRowsSelected()).toBe(true);
			table.setPageIndex(1);
			fixture.detectChanges();
			await fixture.whenStable();
			expect(table.atoms.pagination.get().pageIndex).toBe(1);
			expect(table.getIsAllPageRowsSelected()).toBe(false);
			expect(table.getIsSomePageRowsSelected()).toBe(false);
			table.toggleAllPageRowsSelected(true);
			fixture.detectChanges();
			await fixture.whenStable();
			table.toggleAllPageRowsSelected(false);
			fixture.detectChanges();
			await fixture.whenStable();
			expect(table.getSelectedRowModel().rows.map((row) => row.id)).toEqual(ids);
		});
	}
	it('binds the real page checkbox to partial, checked and empty states', async () => {
		const consumer = TestBed.createComponent(PaymentContract);
		consumer.detectChanges();
		await consumer.whenStable();
		const table = consumer.componentInstance.table;
		table.setPageSize(2);
		consumer.detectChanges();
		await consumer.whenStable();
		const fixture = TestBed.createComponent(TableHeadSelection);
		fixture.componentRef.setInput('table', table);
		fixture.detectChanges();
		await fixture.whenStable();
		const checkbox: HTMLButtonElement = fixture.nativeElement.querySelector('[role="checkbox"]');
		expect(checkbox.getAttribute('aria-label')).toBe('Select all rows on this page');
		table.getRowModel().rows[0].toggleSelected(true);
		consumer.detectChanges();
		fixture.detectChanges();
		await fixture.whenStable();
		expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
		checkbox.click();
		consumer.detectChanges();
		fixture.detectChanges();
		await fixture.whenStable();
		expect(table.getSelectedRowModel().rows).toHaveLength(2);
		expect(checkbox.getAttribute('aria-checked')).toBe('true');
		table.getColumn('email')?.setFilterValue('no-matching-record-xyz');
		consumer.detectChanges();
		fixture.detectChanges();
		await fixture.whenStable();
		expect(checkbox.disabled).toBe(true);
	});
	it('exposes sort on the native header and names the filter and currency cells', async () => {
		const fixture = TestBed.createComponent(DataTablePreview);
		fixture.detectChanges();
		await fixture.whenStable();
		const host: HTMLElement = fixture.nativeElement;
		const sort = host.querySelector<HTMLButtonElement>('thead button[capsButton]');
		expect(sort).not.toBeNull();
		sort?.click();
		fixture.detectChanges();
		await fixture.whenStable();
		expect(host.querySelector('th[aria-sort="ascending"]')?.getAttribute('scope')).toBe('col');
		expect(host.querySelector('input')?.getAttribute('aria-label')).toBe('Filter emails');
		expect(host.querySelector('[data-row-id="m5gr84i9"]')?.textContent).toContain('$316.00');
	});
});
