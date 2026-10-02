import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-button-destructive',
	imports: [CapsButtonImports],
	template: `
		<button capsButton variant="destructive">Destructive</button>
	`,
})
export class ButtonDestructive {}
