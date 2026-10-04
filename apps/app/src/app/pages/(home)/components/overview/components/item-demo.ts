import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideBadgeCheck, lucideChevronRight } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-item-demo',
	imports: [CapsItemImports, CapsButton, NgIcon],
	providers: [
		provideIcons({
			lucideBadgeCheck,
			lucideChevronRight,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex w-full max-w-md flex-col gap-6' },
	template: `
		<caps-item>
			<caps-item-content>
				<caps-item-title>Two-factor authentication</caps-item-title>
				<caps-item-description>Verify via email or phone number.</caps-item-description>
			</caps-item-content>
			<caps-item-actions>
				<button capsButton size="sm">Enable</button>
			</caps-item-actions>
		</caps-item>
		<a capsItem href="/components/item">
			<caps-item-media>
				<ng-icon name="lucideBadgeCheck" />
			</caps-item-media>
			<caps-item-content>
				<caps-item-title>Your profile has been verified.</caps-item-title>
			</caps-item-content>
			<caps-item-actions>
				<ng-icon name="lucideChevronRight" />
			</caps-item-actions>
		</a>
	`,
})
export class ItemDemo {}
