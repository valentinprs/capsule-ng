import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitch } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-switch-disabled',
	imports: [CapsFieldImports, CapsSwitch],
	template: `
		<caps-field orientation="horizontal" data-disabled="true">
			<caps-switch id="switch-disabled" disabled />
			<caps-field-label for="switch-disabled">Disabled</caps-field-label>
		</caps-field>
	`,
})
export class SwitchDisabled {}
