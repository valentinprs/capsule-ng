import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';

@Component({
	selector: 'spartan-tooltip-group',
	imports: [CapsButtonImports, CapsTooltipImports],
	template: `
		<div class="flex gap-2">
			<button [capsTooltip]="'Save'" capsButton variant="outline">Save</button>
			<button [capsTooltip]="'Copy'" capsButton variant="outline">Copy</button>
			<button [capsTooltip]="'Paste'" capsButton variant="outline">Paste</button>
		</div>
	`,
})
export class TooltipGroup {}
