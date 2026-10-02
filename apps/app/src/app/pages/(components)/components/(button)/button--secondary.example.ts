import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-button-secondary',
	imports: [CapsButtonImports],
	template: `
		<button capsButton variant="secondary">Secondary</button>
	`,
})
export class ButtonSecondary {}
