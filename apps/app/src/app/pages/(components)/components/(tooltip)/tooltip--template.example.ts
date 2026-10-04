import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-tooltip-template',
	imports: [CapsButtonImports, CapsTooltipImports, NgIcon],
	providers: [provideIcons({ lucidePlus })],
	template: `
		<button [capsTooltip]="tooltip" capsButton variant="outline">Simple</button>

		<ng-template #tooltip>
			<span class="flex items-center">
				Add to library
				<ng-icon class="ml-2 text-sm" name="lucidePlus" />
			</span>
		</ng-template>
	`,
})
export class TooltipTemplate {}
