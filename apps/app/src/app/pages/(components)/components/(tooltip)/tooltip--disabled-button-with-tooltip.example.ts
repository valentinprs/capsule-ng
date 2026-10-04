import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';

@Component({
	selector: 'spartan-tooltip-disabled-button-with-tooltip',
	imports: [CapsButtonImports, CapsTooltipImports],
	template: `
		<span class="inline-flex" tabindex="0" capsTooltip="Simple tooltip">
			<button capsButton variant="outline" disabled>Disabled Button</button>
		</span>
	`,
})
export class TooltipDisabledButtonWithTooltip {}
