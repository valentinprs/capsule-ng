import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';

@Component({
	selector: 'spartan-tooltip-simple',
	imports: [CapsButtonImports, CapsTooltipImports],
	template: `
		<button [capsTooltip]="'Simple tooltip'" capsButton variant="outline">Simple</button>
	`,
})
export class TooltipSimple {}
