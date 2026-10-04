import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';

@Component({
	selector: 'spartan-popover-basic',
	imports: [CapsPopoverImports, CapsButtonImports],
	template: `
		<caps-popover placement="bottom-start" autoAlign>
			<button capsPopoverTrigger capsButton variant="outline">Open Popover</button>
			<ng-template capsPopoverContent let-ctx>
				<div class="space-y-1">
					<div class="font-medium">Dimensions</div>
					<p class="text-muted-foreground">Set the dimensions for the layer.</p>
				</div>
			</ng-template>
		</caps-popover>
	`,
})
export class PopoverBasic {}
