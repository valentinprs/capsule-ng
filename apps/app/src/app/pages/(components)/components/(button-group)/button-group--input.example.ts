import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';

import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-button-group-input',
	imports: [CapsButtonImports, CapsButtonGroupImports, CapsInputImports, NgIcon],
	providers: [provideIcons({ lucideSearch })],
	template: `
		<caps-button-group aria-label="Actions">
			<input capsInput placeholder="Search..." aria-label="Search" />
			<button capsButton variant="outline" aria-label="Search">
				<ng-icon name="lucideSearch" />
			</button>
		</caps-button-group>
	`,
})
export class ButtonGroupInput {}
