import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCopy } from '@ng-icons/lucide';

import { CapsInputImports } from '@capsule-ng/caps/input';

@Component({
	selector: 'spartan-button-group-with-text',
	imports: [CapsButtonImports, CapsInputImports, CapsButtonGroupImports, NgIcon],
	providers: [provideIcons({ lucideCopy })],
	template: `
		<caps-button-group aria-label="Actions">
			<caps-button-group-text>https://</caps-button-group-text>
			<input capsInput placeholder="Website url" aria-label="Website URL" class="z-(--caps-z-10)" />
			<button capsButton variant="outline" size="icon" aria-label="Copy URL">
				<ng-icon name="lucideCopy" />
			</button>
		</caps-button-group>
	`,
})
export class ButtonGroupWithText {}
