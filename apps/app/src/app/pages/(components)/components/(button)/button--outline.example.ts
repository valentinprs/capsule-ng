import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-button-outline',
	imports: [CapsButtonImports],
	template: `
		<button capsButton variant="outline">Outline</button>
	`,
})
export class ButtonOutline {}
