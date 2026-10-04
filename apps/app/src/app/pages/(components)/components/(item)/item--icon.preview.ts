import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideShieldAlert } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-item-icon-preview',
	imports: [CapsItemImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideShieldAlert })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-lg flex-col gap-6',
	},
	template: `
		<caps-item>
			<caps-item-media>
				<ng-icon name="lucideShieldAlert" />
			</caps-item-media>
			<caps-item-content>
				<caps-item-title>Security Alert</caps-item-title>
				<caps-item-description>New login detected from unknown device.</caps-item-description>
			</caps-item-content>
			<caps-item-actions>
				<button capsButton size="sm" variant="outline">Review</button>
			</caps-item-actions>
		</caps-item>
	`,
})
export class ItemIconPreview {}
