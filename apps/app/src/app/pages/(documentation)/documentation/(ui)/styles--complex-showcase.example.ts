import { Component } from '@angular/core';
import { CapsBadgeImports } from '@capsule-ng/caps/badge';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsSelectImports } from '@capsule-ng/caps/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-styles-complex-showcase',
	imports: [CapsCardImports, CapsBadgeImports, CapsInputImports, CapsSelectImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideCheck })],
	host: {
		class: 'flex w-80',
	},
	template: `
		<caps-card>
			<caps-card-header>
				<caps-card-title [level]="3">Card Title</caps-card-title>
				<caps-card-description>Card description here</caps-card-description>
				<caps-card-action>
					<caps-badge>Badge</caps-badge>
				</caps-card-action>
			</caps-card-header>
			<caps-card-content>
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
			</caps-card-content>
		</caps-card>
	`,
})
export class StylesComplexShowcase {
	protected readonly itemToString = (value: unknown) => `${value}`;
}
