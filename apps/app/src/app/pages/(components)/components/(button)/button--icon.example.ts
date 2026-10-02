import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleFadingArrowUp } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-icon',
	imports: [CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideCircleFadingArrowUp })],
	template: `
		<button capsButton size="icon" variant="outline" aria-label="Upload">
			<ng-icon name="lucideCircleFadingArrowUp" />
		</button>
	`,
})
export class ButtonIcon {}
