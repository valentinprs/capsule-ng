import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';

@Component({
	selector: 'spartan-popover-align',
	imports: [CapsPopoverImports, CapsButtonImports],
	template: `
		<div class="flex gap-6">
			<caps-popover placement="bottom-start">
				<button capsPopoverTrigger capsButton variant="outline">Start</button>
				<ng-template capsPopoverContent let-ctx [class]="'w-40'">Aligned to start</ng-template>
			</caps-popover>
			<caps-popover placement="bottom">
				<button capsPopoverTrigger capsButton variant="outline">Center</button>
				<ng-template capsPopoverContent let-ctx [class]="'w-40'">Aligned to center</ng-template>
			</caps-popover>
			<caps-popover placement="bottom-end">
				<button capsPopoverTrigger capsButton variant="outline">End</button>
				<ng-template capsPopoverContent let-ctx [class]="'w-40'">Aligned to end</ng-template>
			</caps-popover>
		</div>
	`,
})
export class PopoverAlign {}
