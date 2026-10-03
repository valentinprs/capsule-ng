import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitch } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-switch-description',
	imports: [CapsFieldImports, CapsSwitch],
	template: `
		<caps-field orientation="horizontal" class="max-w-sm">
			<caps-field-content>
				<caps-field-label for="switch-focus-mode">Share across devices</caps-field-label>
				<caps-field-description>
					Focus is shared across devices, and turns off when you leave the app.
				</caps-field-description>
			</caps-field-content>
			<caps-switch id="switch-focus-mode" />
		</caps-field>
	`,
})
export class SwitchDescription {}
