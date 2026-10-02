import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { REPOSITORY_URL } from '../../../../../site.config';

@Component({
	selector: 'spartan-button-anchor',
	imports: [CapsButtonImports],
	template: `
		<a capsButton target="_blank" rel="noreferrer" variant="link" href="${REPOSITORY_URL}">View on GitHub</a>
	`,
})
export class ButtonAnchor {}
