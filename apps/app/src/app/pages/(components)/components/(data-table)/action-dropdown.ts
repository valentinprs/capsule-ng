import { Component, input } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideEllipsis } from '@ng-icons/lucide';
import type { Row } from '@tanstack/angular-table';
import type { DataTableFeatures, Payment } from './data-table.preview';

@Component({
	selector: 'spartan-action-dropdown',
	imports: [CapsButtonImports, NgIcon, CapsDropdownMenuImports],
	providers: [provideIcons({ lucideEllipsis })],
	template: `
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
	`,
})
export class ActionDropdown {
	public readonly row = input.required<Row<DataTableFeatures, Payment>>();

	copyPaymentId() {
		const payment = this.row().original;
		navigator.clipboard.writeText(payment.id);
	}
}
