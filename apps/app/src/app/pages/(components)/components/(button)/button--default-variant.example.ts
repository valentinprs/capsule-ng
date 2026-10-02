import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-button-default',
	imports: [CapsButtonImports],
	template: `
		<button capsButton>Button</button>
	`,
})
export class ButtonDefault {}
