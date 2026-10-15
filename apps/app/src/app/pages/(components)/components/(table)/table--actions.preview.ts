import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { CapsTableImports } from '@capsule-ng/caps/table';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoreHorizontal } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-table-actions',
	imports: [CapsTableImports, CapsButtonImports, CapsDropdownMenuImports, NgIcon],
	providers: [provideIcons({ lucideMoreHorizontal })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'w-full',
	},
	template: `
		<caps-table-container>
			<table capsTable>
				<caption>Products and row actions</caption>
				<thead>
					<tr>
						<th scope="col">Product</th>
						<th scope="col">Price</th>
						<th scope="col" class="text-right">Actions</th>
					</tr>
				</thead>
				<tbody>
					@for (product of _products; track product.name) {
						<tr>
							<th scope="row" class="font-medium">{{ product.name }}</th>
							<td>{{ product.price }}</td>
							<td class="text-right">
								<button
									capsButton
									variant="ghost"
									size="icon-sm"
									[capsDropdownMenuTrigger]="menu"
									placement="bottom-end"
								>
									<ng-icon name="lucideMoreHorizontal" />
									<span class="sr-only">Actions for {{ product.name }}</span>
								</button>
							</td>
						</tr>
					}
				</tbody>
			</table>
		</caps-table-container>

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
