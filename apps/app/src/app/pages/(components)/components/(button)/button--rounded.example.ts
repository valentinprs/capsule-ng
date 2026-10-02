import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-rounded-preview',
	imports: [CapsButtonImports, NgIcon],
	providers: [
		provideIcons({
			lucideArrowUp,
		}),
	],
	template: `
		<button capsButton variant="outline" size="icon" aria-label="Upload" class="rounded-full">
			<ng-icon name="lucideArrowUp" />
		</button>
	`,
})
export class ButtonRoundedPreview {}
