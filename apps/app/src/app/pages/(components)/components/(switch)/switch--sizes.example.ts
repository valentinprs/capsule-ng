import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitch } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-switch-sizes',
	imports: [CapsFieldImports, CapsSwitch],
	host: { class: 'w-full max-w-40' },
	template: `
		<caps-field-group>
			<caps-field orientation="horizontal">
				<caps-switch id="switch-size-sm" size="sm" />
				<caps-field-label for="switch-size-sm">Small</caps-field-label>
			</caps-field>
			<caps-field orientation="horizontal">
				<caps-switch id="switch-size-default" />
				<caps-field-label for="switch-size-default">Default</caps-field-label>
			</caps-field>
		</caps-field-group>
	`,
})
export class SwitchSizes {}
