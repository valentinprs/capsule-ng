import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsSwitch } from '@capsule-ng/caps/switch';

@Component({
	selector: 'spartan-switch-choice-card',
	imports: [CapsFieldImports, CapsSwitch],
	host: { class: 'min-w-xs sm:min-w-sm' },
	template: `
		<caps-field-group class="w-full max-w-sm">
			<caps-field-label for="switch-share">
				<caps-field orientation="horizontal">
					<caps-field-content>
						<span class="font-medium">Share across devices</span>
						<caps-field-description>
							Focus is shared across devices, and turns off when you leave the app.
						</caps-field-description>
					</caps-field-content>
					<caps-switch id="switch-share" />
				</caps-field>
			</caps-field-label>
			<caps-field-label for="switch-notifications">
				<caps-field orientation="horizontal">
					<caps-field-content>
						<span class="font-medium">Enable notifications</span>
						<caps-field-description>
							Receive notifications when focus mode is enabled or disabled.
						</caps-field-description>
					</caps-field-content>
					<caps-switch id="switch-notifications" />
				</caps-field>
			</caps-field-label>
		</caps-field-group>
	`,
})
export class SwitchChoiceCard {}
