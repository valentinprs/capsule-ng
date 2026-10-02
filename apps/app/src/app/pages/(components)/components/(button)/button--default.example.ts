import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-button-default-preview',
	imports: [CapsButtonImports],
	template: `
		<button capsButton>Button</button>
	`,
})
export class ButtonDefaultPreview {}
