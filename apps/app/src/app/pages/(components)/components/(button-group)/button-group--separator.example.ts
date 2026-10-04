import { Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsButtonGroupImports } from '@capsule-ng/caps/button-group';

@Component({
	selector: 'spartan-button-group-separator',
	imports: [CapsButtonImports, CapsButtonGroupImports],
	template: `
		<caps-button-group aria-label="Actions">
			<button capsButton variant="secondary" size="sm">Copy</button>
			<caps-separator orientation="vertical" />
			<button capsButton variant="secondary" size="sm">Paste</button>
		</caps-button-group>
	`,
})
export class ButtonGroupSeparator {}
