import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsDropdownMenuImports } from '@capsule-ng/caps/dropdown-menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBuilding2, lucideCreditCard, lucideWallet } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-dropdown-radio-group-icons',
	imports: [CapsDropdownMenuImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideCreditCard, lucideWallet, lucideBuilding2 })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<button capsButton variant="outline" [capsDropdownMenuTrigger]="menu">Payment Method</button>

		<ng-template #menu>
			<caps-menu class="w-56">
				<caps-menu-group label="Select Payment Method" type="radio" [(value)]="payment">
					<button capsMenuRadioItem value="card">
						<ng-icon name="lucideCreditCard" />
						Credit Card
					</button>
					<button capsMenuRadioItem value="paypal">
						<ng-icon name="lucideWallet" />
						PayPal
					</button>
					<button capsMenuRadioItem value="bank">
						<ng-icon name="lucideBuilding2" />
						Bank Transfer
					</button>
				</caps-menu-group>
			</caps-menu>
		</ng-template>
	`,
})
export class DropdownRadioGroupIcons {
	public readonly payment = signal<'card' | 'paypal' | 'bank'>('card');
}
