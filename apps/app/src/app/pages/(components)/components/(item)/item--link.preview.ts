import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight, lucideExternalLink } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-item-link-preview',
	imports: [CapsItemImports, NgIcon, RouterLink],
	providers: [provideIcons({ lucideChevronRight, lucideExternalLink })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-md flex-col gap-6',
	},
	template: `
		<a capsItem routerLink=".">
			<caps-item-content>
				<caps-item-title>Visit our documentation</caps-item-title>
				<caps-item-description>Learn how to get started with our components.</caps-item-description>
			</caps-item-content>
			<caps-item-actions>
				<ng-icon name="lucideChevronRight" class="text-[length:--spacing(4)]" />
			</caps-item-actions>
		</a>
		<a capsItem href="#" target="_blank" rel="noopener noreferrer">
			<caps-item-content>
				<caps-item-title>External resource</caps-item-title>
				<caps-item-description>Opens in a new tab with security attributes.</caps-item-description>
			</caps-item-content>
			<caps-item-actions>
				<ng-icon name="lucideExternalLink" class="text-[length:--spacing(4)]" />
			</caps-item-actions>
		</a>
	`,
})
export class ItemLinkPreview {}
