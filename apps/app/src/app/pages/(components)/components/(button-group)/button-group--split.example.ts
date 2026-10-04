import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-group-split',
	imports: [CapsButtonImports, CapsButtonGroupImports, NgIcon],
	providers: [provideIcons({ lucidePlus })],
	template: `
		<caps-button-group aria-label="Actions">
			<button capsButton variant="secondary">Button</button>
			<caps-separator orientation="vertical" />
			<button capsButton variant="secondary" size="icon" aria-label="Add">
				<ng-icon name="lucidePlus" />
			</button>
		</caps-button-group>
	`,
})
export class ButtonGroupSplit {}
