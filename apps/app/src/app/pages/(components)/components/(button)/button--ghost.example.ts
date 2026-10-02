import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-button-ghost',
	imports: [CapsButtonImports],
	template: `
		<button capsButton variant="ghost">Ghost</button>
	`,
})
export class ButtonGhost {}
