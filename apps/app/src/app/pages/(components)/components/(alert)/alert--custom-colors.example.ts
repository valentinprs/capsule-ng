import { Component } from '@angular/core';
import { CapsAlertImports } from '@capsule-ng/caps/alert';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAlertTriangle } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-alert-custom-colors',
	imports: [CapsAlertImports, NgIcon],
	providers: [provideIcons({ lucideAlertTriangle })],
	template: `
		<caps-alert
			class="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50"
		>
			<caps-alert-media><ng-icon name="lucideAlertTriangle" aria-hidden="true" /></caps-alert-media>
			<caps-alert-title>Your subscription will expire in 3 days.</caps-alert-title>
			<caps-alert-description>
				Renew now to avoid service interruption or upgrade to a paid plan to continue using the service.
			</caps-alert-description>
		</caps-alert>
	`,
})
export class AlertCustomColors {}
