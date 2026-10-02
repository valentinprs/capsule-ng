import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-button-link',
	imports: [CapsButtonImports],
	template: `
		<button capsButton variant="link">Link</button>
	`,
})
export class ButtonLink {}
