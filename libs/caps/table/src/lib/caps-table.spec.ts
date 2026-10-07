import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CapsTableImports } from '../index';
@Component({
	selector: 'caps-table-test',
	imports: [CapsTableImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-table-container>
			<table capsTable [striped]="striped()" [noBorder]="false" [size]="size()">
				<caption>Invoices</caption>
				<thead>
					<tr>
						<th scope="col">Invoice</th>
						<th scope="col">Amount</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">INV01</th>
						<td>€120</td>
					</tr>
				</tbody>
				<tfoot>
					<tr><td colspan="2">Total €120</td></tr>
				</tfoot>
			</table>
		</caps-table-container>
	`,
})
class TableHost {
	public readonly striped = signal(false);
	public readonly size = signal<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
}
@Component({
	selector: 'caps-table-override-test',
	imports: [CapsTableImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template:
		'<caps-table-container tabindex="-1"><table capsTable><caption>Tab order override</caption><tbody><tr><td>One</td></tr></tbody></table></caps-table-container>',
})
class TableOverrideHost {}
describe('CapsTable public native anatomy', () => {
	it('preserves the table model, caption, scoped headers, sections and spanning cells', () => {
		const f = TestBed.createComponent(TableHost);
		f.detectChanges();
		const root: HTMLElement = f.nativeElement;
		const table = root.querySelector('table')!;
		expect(table.caption?.textContent).toBe('Invoices');
		expect(table.tHead?.rows.length).toBe(1);
		expect(table.tBodies[0].rows.length).toBe(1);
		expect(table.tFoot?.rows[0].cells[0].colSpan).toBe(2);
		expect([...table.children].map((e) => e.tagName)).toEqual(['CAPTION', 'THEAD', 'TBODY', 'TFOOT']);
		expect(root.querySelector('tbody th')?.getAttribute('scope')).toBe('row');
		f.componentInstance.striped.set(true);
		f.componentInstance.size.set('xs');
		f.detectChanges();
		expect(table.hasAttribute('data-striped')).toBe(true);
		expect(table.getAttribute('data-size')).toBe('xs');
		expect(table.hasAttribute('data-no-border')).toBe(false);
	});
	it('honors a consumer native tab-order override while allowing explicit focus', () => {
		const f = TestBed.createComponent(TableOverrideHost);
		f.detectChanges();
		const container: HTMLElement = f.nativeElement.querySelector('caps-table-container');
		expect(container.tabIndex).toBe(-1);
		container.focus();
		expect(document.activeElement).toBe(container);
	});
});
