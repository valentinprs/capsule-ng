import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-button-preview',
	imports: [CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideArrowUp })],
	host: { class: 'flex flex-wrap items-center gap-2 md:flex-row' },
	template: `
		<button capsButton variant="outline">Button</button>
		<button capsButton size="icon" variant="outline" aria-label="Upload">
			<ng-icon name="lucideArrowUp" />
		</button>
	`,
})
export class ButtonPreview {}

export const defaultImports = `
import { CapsButtonImports } from '@capsule-ng/caps/button';
`;

export const defaultSkeleton = `
<button capsButton>Button</button>
`;
