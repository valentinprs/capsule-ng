import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';

@Component({
	selector: 'spartan-tooltip-disabled',
	imports: [CapsButtonImports, CapsTooltipImports],
	template: `
		<button [capsTooltip]="'Simple tooltip'" [tooltipDisabled]="true" capsButton variant="outline">Simple</button>
	`,
})
export class TooltipDisabled {}
