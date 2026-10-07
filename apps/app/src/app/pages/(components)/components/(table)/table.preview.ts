import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsTableImports } from '@capsule-ng/caps/table';

@Component({
	selector: 'spartan-table-preview',
	imports: [CapsTableImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full',
	},
	template: `
		<caps-table-container>
			<table capsTable>
				<caption>A list of your recent invoices.</caption>
				<thead>
					<tr>
						<th scope="col" class="w-[100px]">Invoice</th>
						<th scope="col">Status</th>
						<th scope="col">Method</th>
						<th scope="col" class="text-right">Amount</th>
					</tr>
				</thead>
				<tbody>
					@for (invoice of _invoices; track invoice.invoice) {
						<tr>
							<th scope="row" class="font-medium">{{ invoice.invoice }}</th>
							<td>{{ invoice.paymentStatus }}</td>
							<td>{{ invoice.paymentMethod }}</td>
							<td class="text-right">{{ invoice.totalAmount }}</td>
						</tr>
					}
				</tbody>
				<tfoot>
					<tr>
						<td [attr.colSpan]="3">Total</td>
						<td class="text-right">$2,500.00</td>
					</tr>
				</tfoot>
			</table>
		</caps-table-container>
	`,
})
export class TablePreview {
	protected _invoices = [
		{
			invoice: 'INV001',
			paymentStatus: 'Paid',
			totalAmount: '$250.00',
			paymentMethod: 'Credit Card',
		},
		{
			invoice: 'INV002',
			paymentStatus: 'Pending',
			totalAmount: '$150.00',
			paymentMethod: 'PayPal',
		},
		{
			invoice: 'INV003',
			paymentStatus: 'Unpaid',
			totalAmount: '$350.00',
			paymentMethod: 'Bank Transfer',
		},
		{
			invoice: 'INV004',
			paymentStatus: 'Paid',
			totalAmount: '$450.00',
			paymentMethod: 'Credit Card',
		},
		{
			invoice: 'INV005',
			paymentStatus: 'Paid',
			totalAmount: '$550.00',
			paymentMethod: 'PayPal',
		},
		{
			invoice: 'INV006',
			paymentStatus: 'Pending',
			totalAmount: '$200.00',
			paymentMethod: 'Bank Transfer',
		},
		{
			invoice: 'INV007',
			paymentStatus: 'Unpaid',
			totalAmount: '$300.00',
			paymentMethod: 'Credit Card',
		},
	];
}

export const defaultImports = `
import { CapsTableImports } from '@capsule-ng/caps/table';
`;

export const defaultSkeleton = `
<caps-table-container>
  <table capsTable>
    <caption>
      A list of your recent invoices.
    </caption>
    <thead>
      <tr>
        <th scope="col" class="w-[100px]">Invoice</th>
        <th scope="col">Status</th>
        <th scope="col">Method</th>
        <th scope="col" class="text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      @for (invoice of _invoices; track invoice.invoice) {
      <tr>
        <th scope="row" class="font-medium">{{ invoice.invoice }}</th>
        <td>{{ invoice.paymentStatus }}</td>
        <td>{{ invoice.paymentMethod }}</td>
        <td class="text-right">{{ invoice.totalAmount }}</td>
      </tr>
      }
    </tbody>
    <tfoot>
      <tr>
        <td [attr.colSpan]="3">Total</td>
        <td class="text-right">$2,500.00</td>
      </tr>
    </tfoot>
  </table>
</caps-table-container>
`;
