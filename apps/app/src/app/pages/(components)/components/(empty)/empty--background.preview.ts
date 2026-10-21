import { Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsEmptyImports } from '@capsule-ng/caps/empty';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBell, lucideRefreshCcw } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-empty-background',
	imports: [NgIcon, CapsButton, CapsEmptyImports],
	providers: [provideIcons({ lucideBell, lucideRefreshCcw })],
	template: `
		<caps-empty class="bg-muted h-full w-full">
			<caps-empty-media variant="icon">
				<ng-icon aria-hidden="true" name="lucideBell" />
			</caps-empty-media>
			<caps-empty-title>No notifications</caps-empty-title>
			<caps-empty-description>You're all caught up. New notifications will appear here.</caps-empty-description>

			<caps-empty-actions>
				<button type="button" capsButton variant="outline">
					<ng-icon aria-hidden="true" name="lucideRefreshCcw" />
					Refresh
				</button>
			</caps-empty-actions>
		</caps-empty>
	`,
})
export class EmptyBackground {}
