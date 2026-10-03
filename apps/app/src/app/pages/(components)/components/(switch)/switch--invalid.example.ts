import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitch } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-switch-invalid',
	imports: [CapsFieldImports, CapsSwitch],
	template: `
		<caps-field orientation="horizontal" class="max-w-sm" forceInvalid>
			<caps-field-content>
				<caps-field-label>Accept terms and conditions</caps-field-label>
				<caps-field-description>You must accept the terms and conditions to continue.</caps-field-description>
			</caps-field-content>
			<caps-switch forceInvalid />
		</caps-field>
	`,
})
export class SwitchInvalid {}
