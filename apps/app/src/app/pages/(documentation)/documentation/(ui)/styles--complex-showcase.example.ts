import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmSelectImports } from '@spartan-ng/helm/select';

@Component({
	selector: 'spartan-styles-complex-showcase',
	imports: [CapsCardImports, HlmBadgeImports, CapsInputImports, HlmSelectImports, CapsButtonImports, NgIcon],
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
					<span hlmBadge>Badge</span>
				</caps-card-action>
			</caps-card-header>
			<caps-card-content>
				<div class="flex flex-col gap-4">
					<input capsInput placeholder="Enter text..." />
					<hlm-select [itemToString]="itemToString">
						<hlm-select-trigger class="w-full">
							<hlm-select-value placeholder="Select option" />
						</hlm-select-trigger>
						<hlm-select-content *hlmSelectPortal>
							<hlm-select-item value="1">Option 1</hlm-select-item>
							<hlm-select-item value="2">Option 2</hlm-select-item>
							<hlm-select-item value="3">Option 3</hlm-select-item>
						</hlm-select-content>
					</hlm-select>
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
