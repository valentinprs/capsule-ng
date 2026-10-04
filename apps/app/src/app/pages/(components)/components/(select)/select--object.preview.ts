import { Component } from '@angular/core';
import { CapsSelectImports } from '@capsule-ng/caps/select';
@Component({
	selector: 'spartan-select-object-preview',
	imports: [CapsSelectImports],
	template: `
		<caps-select aria-label="Shipping method" placeholder="Select a shipping method" class="w-72">
			<ng-template capsSelectValue let-value>
				<span class="flex items-baseline gap-0.5">
					<span>{{ value.name }}</span>
					<span class="text-muted-foreground text-xs">({{ value.price }})</span>
				</span>
			</ng-template>

			@for (method of shippingMethods; track method.id) {
				<caps-select-option [value]="method" [label]="method.name">
					<div class="flex flex-col gap-0.5">
						<div class="flex items-baseline gap-0.5">
							<span>{{ method.name }}</span>
							<span class="text-muted-foreground text-xs">({{ method.price }})</span>
						</div>
						<span class="text-muted-foreground text-xs">{{ method.duration }}</span>
					</div>
				</caps-select-option>
			}
		</caps-select>
	`,
})
export class SelectObjectPreview {
	public readonly shippingMethods = [
		{
			id: 'standard',
			name: 'Standard',
			duration: 'Delivers in 4-6 business days',
			price: '$4.99',
		},
		{
			id: 'express',
			name: 'Express',
			duration: 'Delivers in 2-3 business days',
			price: '$9.99',
		},
		{
			id: 'overnight',
			name: 'Overnight',
			duration: 'Delivers next business day',
			price: '$19.99',
		},
	];
}
