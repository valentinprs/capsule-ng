import { Component, signal } from '@angular/core';
import { CapsAlertImports } from '@capsule-ng/caps/alert';
import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAlertCircle } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-alert-destructive',
	imports: [CapsAlertImports, CapsButton, NgIcon],
	providers: [provideIcons({ lucideAlertCircle })],
	template: `
		<div class="grid w-full max-w-md gap-3">
			<button capsButton type="button" variant="outline" (click)="_failed.set(true)">Simulate payment failure</button>
			@if (_failed()) {
				<caps-alert variant="destructive" role="alert">
					<caps-alert-media><ng-icon name="lucideAlertCircle" aria-hidden="true" /></caps-alert-media>
					<caps-alert-title>Payment failed</caps-alert-title>
					<caps-alert-description>
						Your payment could not be processed. Please check your payment method and try again.
					</caps-alert-description>
					<caps-alert-actions>
						<button capsButton type="button" variant="outline" size="sm" (click)="_failed.set(false)">Try again</button>
					</caps-alert-actions>
				</caps-alert>
			}
		</div>
	`,
})
export class AlertDestructive {
	protected readonly _failed = signal(false);
}
