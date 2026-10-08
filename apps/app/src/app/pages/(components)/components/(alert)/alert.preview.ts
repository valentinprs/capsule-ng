import { Component } from '@angular/core';
import { CapsAlertImports } from '@capsule-ng/caps/alert';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleCheck, lucideInfo } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-alert-preview',
	imports: [CapsAlertImports, NgIcon],
	providers: [provideIcons({ lucideCircleCheck, lucideInfo })],
	template: `
		<div class="grid w-full max-w-md items-start gap-4">
			<caps-alert>
				<caps-alert-media><ng-icon name="lucideCircleCheck" aria-hidden="true" /></caps-alert-media>
				<caps-alert-title>Payment successful</caps-alert-title>
				<caps-alert-description>
					Your payment of $29.99 has been processed. A receipt has been sent to your email address.
				</caps-alert-description>
			</caps-alert>
			<caps-alert>
				<caps-alert-media><ng-icon name="lucideInfo" aria-hidden="true" /></caps-alert-media>
				<caps-alert-title>New feature available</caps-alert-title>
				<caps-alert-description>
					We've added dark mode support. You can enable it in your account settings.
				</caps-alert-description>
			</caps-alert>
		</div>
	`,
})
export class AlertPreview {}

export const defaultImports = `
import { CapsAlertImports } from '@capsule-ng/caps/alert';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { NgIcon } from '@ng-icons/core';
`;

export const defaultSkeleton = `
<caps-alert>
  <caps-alert-media><ng-icon name="lucideCircleCheck" aria-hidden="true" /></caps-alert-media>
  <caps-alert-title>Heads up!</caps-alert-title>
  <caps-alert-description>Import the components from the Capsule package to get started.</caps-alert-description>
  <caps-alert-actions>
    <button type="button" capsButton variant="outline" size="xs">Enable</button>
  </caps-alert-actions>
</caps-alert>
`;
