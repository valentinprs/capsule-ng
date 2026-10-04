import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsTooltipImports } from '@capsule-ng/caps/tooltip';

@Component({
	selector: 'spartan-tooltip-position',
	imports: [CapsButtonImports, CapsTooltipImports],
	host: {
		class: 'flex flex-col space-y-2',
	},
	template: `
		<button type="button" capsButton variant="outline" capsTooltip="Tooltip content" placement="top">Top</button>

		<div class="flex space-x-2">
			<button type="button" capsButton variant="outline" capsTooltip="Tooltip content" placement="left">Left</button>
			<button type="button" capsButton variant="outline" capsTooltip="Tooltip content" placement="right">Right</button>
		</div>

		<button type="button" capsButton variant="outline" capsTooltip="Tooltip content" placement="bottom">Bottom</button>
	`,
})
export class TooltipPosition {}
