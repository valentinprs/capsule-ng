import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-group-size',
	imports: [CapsButtonImports, CapsButtonGroupImports, NgIcon],
	providers: [provideIcons({ lucidePlus })],
	template: `
		<div class="flex flex-col items-start gap-8">
			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline" size="sm">Small</button>
				<button capsButton variant="outline" size="sm">Button</button>
				<button capsButton variant="outline" size="sm">Group</button>
				<button capsButton variant="outline" size="icon-sm" aria-label="Add">
					<ng-icon name="lucidePlus" />
				</button>
			</caps-button-group>
			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline">Default</button>
				<button capsButton variant="outline">Button</button>
				<button capsButton variant="outline">Group</button>
				<button capsButton variant="outline" size="icon" aria-label="Add">
					<ng-icon name="lucidePlus" />
				</button>
			</caps-button-group>
			<caps-button-group aria-label="Actions">
				<button capsButton variant="outline" size="lg">Large</button>
				<button capsButton variant="outline" size="lg">Button</button>
				<button capsButton variant="outline" size="lg">Group</button>
				<button capsButton variant="outline" size="icon-lg" aria-label="Add">
					<ng-icon name="lucidePlus" />
				</button>
			</caps-button-group>
		</div>
	`,
})
export class ButtonGroupSize {}
