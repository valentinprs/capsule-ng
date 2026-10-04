import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMinus, lucidePlus } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-group-orientation',
	imports: [CapsButtonImports, CapsButtonGroupImports, NgIcon],
	providers: [provideIcons({ lucidePlus, lucideMinus })],
	template: `
		<caps-button-group stacked aria-label="Media controls" class="h-fit">
			<button capsButton variant="outline" size="icon" aria-label="Zoom in">
				<ng-icon name="lucidePlus" />
			</button>
			<button capsButton variant="outline" size="icon" aria-label="Zoom out">
				<ng-icon name="lucideMinus" />
			</button>
		</caps-button-group>
	`,
})
export class ButtonGroupOrientation {}
