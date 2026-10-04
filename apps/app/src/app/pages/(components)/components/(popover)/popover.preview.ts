import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsLabelImports } from '@capsule-ng/caps/label';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';

@Component({
	selector: 'spartan-popover-preview',
	imports: [CapsPopoverImports, CapsButtonImports, CapsLabelImports, CapsInputImports],
	template: `
		<caps-popover>
			<button capsPopoverTrigger capsButton variant="outline">Open Popover</button>
			<ng-template capsPopoverContent let-ctx [class]="'grid w-80 gap-4'">
				<div class="space-y-2">
					<h4 class="leading-none font-medium">Dimensions</h4>
					<p class="text-muted-foreground text-sm">Set the dimensions for the layer.</p>
				</div>
				<div class="grid gap-2">
					<div class="grid grid-cols-3 items-center gap-4">
						<label capsLabel for="width">Width</label>
						<input capsInput id="width" [defaultValue]="'100%'" class="col-span-2 h-8" />
					</div>
					<div class="grid grid-cols-3 items-center gap-4">
						<label capsLabel for="maxWidth">Max. width</label>
						<input capsInput id="maxWidth" [defaultValue]="'300px'" class="col-span-2 h-8" />
					</div>
					<div class="grid grid-cols-3 items-center gap-4">
						<label capsLabel for="height">Height</label>
						<input capsInput id="height" [defaultValue]="'25px'" class="col-span-2 h-8" />
					</div>
					<div class="grid grid-cols-3 items-center gap-4">
						<label capsLabel for="maxHeight">Max. height</label>
						<input capsInput id="maxHeight" [defaultValue]="'none'" class="col-span-2 h-8" />
					</div>
				</div>
			</ng-template>
		</caps-popover>
	`,
})
export class PopoverPreview {}

export const defaultImports = `
import { CapsPopoverImports } from '@capsule-ng/caps/popover';
`;

export const defaultSkeleton = `
<caps-popover>
  <button capsPopoverTrigger>Open Popover</button>
  <ng-template capsPopoverContent let-ctx></ng-template>
</caps-popover>
`;
