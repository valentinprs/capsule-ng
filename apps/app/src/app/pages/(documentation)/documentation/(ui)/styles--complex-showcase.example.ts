import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmCardImports } from '@spartan-ng/helm/card';
@Component({
	selector: 'spartan-styles-complex-showcase',
	imports: [HlmCardImports, HlmBadgeImports, CapsInputImports, CapsSelectImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideCheck })],
	host: {
		class: 'flex w-80',
	},
	template: `
		<hlm-card class="w-full">
			<hlm-card-header>
				<h3 hlmCardTitle>Card Title</h3>
				<p hlmCardDescription>Card description here</p>
				<div hlmCardAction>
					<span hlmBadge>Badge</span>
				</div>
			</hlm-card-header>
			<div hlmCardContent>
				<div class="flex flex-col gap-4">
					<input capsInput placeholder="Enter text..." />
					<caps-select [itemToString]="itemToString" placeholder="Select option" class="w-full">
						<caps-select-option value="1">Option 1</caps-select-option>
						<caps-select-option value="2">Option 2</caps-select-option>
						<caps-select-option value="3">Option 3</caps-select-option>
					</caps-select>
					<div class="flex gap-2">
						<button capsButton variant="outline" class="flex-1">Cancel</button>
						<button capsButton class="flex-1">
							<ng-icon name="lucideCheck" class="mr-1" />
							Submit
						</button>
					</div>
				</div>
			</div>
		</hlm-card>
	`,
})
export class StylesComplexShowcase {
	protected readonly itemToString = (value: unknown) => `${value}`;
}
