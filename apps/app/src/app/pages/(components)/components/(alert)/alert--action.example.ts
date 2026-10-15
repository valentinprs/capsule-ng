import { Component, signal } from '@angular/core';
import { CapsAlertImports } from '@capsule-ng/caps/alert';
import { CapsButtonImports } from '@capsule-ng/caps/button';

@Component({
	selector: 'spartan-alert-action',
	imports: [CapsAlertImports, CapsButtonImports],
	template: `
		<caps-alert class="max-w-md">
			<caps-alert-title>{{ _enabled() ? 'Dark mode enabled' : 'Dark mode is now available' }}</caps-alert-title>
			<caps-alert-description>Enable it under your profile settings to get started.</caps-alert-description>
			<caps-alert-actions>
				<button type="button" capsButton size="xs" [disabled]="_enabled()" (click)="_enabled.set(true)">
					{{ _enabled() ? 'Enabled' : 'Enable' }}
				</button>
			</caps-alert-actions>
		</caps-alert>
	`,
})
export class AlertAction {
	protected readonly _enabled = signal(false);
}
