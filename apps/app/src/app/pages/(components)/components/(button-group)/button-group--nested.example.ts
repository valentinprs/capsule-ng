import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft, lucideArrowRight } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-group-nested',
	imports: [CapsButtonImports, CapsButtonGroupImports, NgIcon],
	providers: [provideIcons({ lucideArrowRight, lucideArrowLeft })],
	template: `
		<caps-button-group aria-label="Actions">
			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline" size="sm">1</button>
				<button capsButton variant="outline" size="sm">2</button>
				<button capsButton variant="outline" size="sm">3</button>
				<button capsButton variant="outline" size="sm">4</button>
				<button capsButton variant="outline" size="sm">5</button>
			</caps-button-group>
			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline" size="icon-sm" aria-label="Previous">
					<ng-icon name="lucideArrowLeft" />
				</button>
				<button capsButton variant="outline" size="icon-sm" aria-label="Next">
					<ng-icon name="lucideArrowRight" />
				</button>
			</caps-button-group>
		</caps-button-group>
	`,
})
export class ButtonGroupNested {}
