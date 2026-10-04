import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitchImports } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-field-switch-preview',
	imports: [CapsFieldImports, CapsSwitchImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field orientation="horizontal">
			<caps-field-content>
				<caps-field-label>Multi-factor authentication</caps-field-label>
				<caps-field-description>
					Enable multi-factor authentication. If you do not have a two-factor device, you can use a one-time code sent
					to your email.
				</caps-field-description>
			</caps-field-content>
			<caps-switch />
		</caps-field>
	`,
})
export class FieldSwitchPreview {}
