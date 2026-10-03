import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitch } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-switch-disabled',
	imports: [CapsFieldImports, CapsSwitch],
	template: `
		<caps-field orientation="horizontal">
			<caps-switch disabled />
			<caps-field-label>Disabled</caps-field-label>
		</caps-field>
	`,
})
export class SwitchDisabled {}
