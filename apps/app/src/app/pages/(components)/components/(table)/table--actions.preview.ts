import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoreHorizontal } from '@ng-icons/lucide';
import { HlmTableImports } from '@spartan-ng/helm/table';

@Component({
	selector: 'spartan-table-actions',
	imports: [HlmTableImports, CapsButtonImports, CapsDropdownMenuImports, NgIcon],
	providers: [provideIcons({ lucideMoreHorizontal })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full',
	},
	template: `
		<div hlmTableContainer>
			<table hlmTable>
				<thead hlmTableHeader>
					<tr hlmTableRow>
						<th hlmTableHead>Product</th>
						<th hlmTableHead>Price</th>
						<th hlmTableHead class="text-right">Actions</th>
					</tr>
				</thead>
				<tbody hlmTableBody>
					@for (product of _products; track product.name) {
						<tr hlmTableRow>
							<td hlmTableCell class="font-medium">{{ product.name }}</td>
							<td hlmTableCell>{{ product.price }}</td>
							<td hlmTableCell class="text-right">
								<button
									capsButton
									variant="ghost"
									size="icon-sm"
									[capsDropdownMenuTrigger]="menu"
									placement="bottom-end"
								>
									<ng-icon name="lucideMoreHorizontal" />
									<span class="sr-only">Open menu</span>
								</button>
							</td>
						</tr>
					}
				</tbody>
			</table>
		</div>

		<ng-template #menu>
			<caps-menu>
				<button capsMenuItem>Edit</button>
				<button capsMenuItem>Duplicate</button>
				<caps-menu-separator />
				<button capsMenuItem danger>Delete</button>
			</caps-menu>
		</ng-template>
	`,
})
export class TableActions {
	protected _products = [
		{
			name: 'Wireless Mouse',
			price: '$29.99',
		},
		{
			name: 'Mechanical Keyboard',
			price: '$129.99',
		},
		{
			name: 'USB-C Hub',
			price: '$49.99',
		},
	];
}
