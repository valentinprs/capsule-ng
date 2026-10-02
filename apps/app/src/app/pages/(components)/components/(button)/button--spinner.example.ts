import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-button-spinner',
	imports: [CapsButtonImports],
	host: {
		class: 'flex gap-2',
	},
	template: `
		<button capsButton variant="outline" disabled>
			<span
				aria-hidden="true"
				data-icon="inline-start"
				class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
			></span>
			Generating
		</button>
		<button capsButton variant="secondary" disabled>
			Downloading
			<span
				aria-hidden="true"
				data-icon="inline-end"
				class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
			></span>
		</button>
	`,
})
export class ButtonSpinner {}
