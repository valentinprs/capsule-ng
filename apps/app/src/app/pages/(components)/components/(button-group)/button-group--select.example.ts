import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowRight } from '@ng-icons/lucide';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';

import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsSelectImports } from '@capsule-ng/caps/select';
@Component({
	selector: 'spartan-button-group-select',
	imports: [CapsInputImports, CapsButtonImports, CapsSelectImports, HlmButtonGroupImports, NgIcon],
	providers: [provideIcons({ lucideArrowRight })],
	template: `
		<div hlmButtonGroup>
			<div hlmButtonGroup class="[&>caps-select>button]:rounded-r-none">
				<caps-select
					aria-label="Currency"
					class="inline-block"
					[value]="_currencies[0].value"
					placeholder="Select an option"
					panelClass="!min-w-40"
				>
					@for (currency of _currencies; track currency.label) {
						<caps-select-option [value]="currency.value">
							<span>
								{{ currency.value }}
							</span>
							<span class="text-muted-foreground">{{ currency.label }}</span>
						</caps-select-option>
					}
				</caps-select>
				<input capsInput placeholder="10.00" />
			</div>
			<div hlmButtonGroup>
				<button capsButton variant="outline" size="icon">
					<ng-icon name="lucideArrowRight" />
				</button>
			</div>
		</div>
	`,
})
export class ButtonGroupSelect {
	protected readonly _currencies = [
		{
			value: '$',
			label: 'US Dollar',
		},
		{
			value: '€',
			label: 'Euro',
		},
		{
			value: '£',
			label: 'British Pound',
		},
	];
}
