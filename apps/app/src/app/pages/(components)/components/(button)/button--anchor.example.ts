import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-button-anchor',
	imports: [CapsButtonImports],
	template: `
		<a capsButton target="_blank" rel="noreferrer" variant="link" href="https://github.com/valentinprs/capsule-ng">
			View on GitHub
		</a>
	`,
})
export class ButtonAnchor {}
