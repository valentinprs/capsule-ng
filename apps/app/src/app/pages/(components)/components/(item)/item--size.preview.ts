import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInbox } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-item-size-preview',
	imports: [CapsItemImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucideInbox })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-md flex-col gap-6',
	},
	template: `
		<caps-item-group size="sm" label="sm">
			<caps-item>
				<caps-item-media><ng-icon name="lucideInbox" /></caps-item-media>
				<caps-item-content>
					<caps-item-title>Inbox</caps-item-title>
					<caps-item-description>New messages from your team.</caps-item-description>
				</caps-item-content>
				<caps-item-actions>
					<button capsButton type="button" variant="outline" size="sm">Open</button>
				</caps-item-actions>
			</caps-item>
		</caps-item-group>
		<caps-item-group size="md" label="md">
			<caps-item>
				<caps-item-media><ng-icon name="lucideInbox" /></caps-item-media>
				<caps-item-content>
					<caps-item-title>Inbox</caps-item-title>
					<caps-item-description>New messages from your team.</caps-item-description>
				</caps-item-content>
				<caps-item-actions>
					<button capsButton type="button" variant="outline" size="sm">Open</button>
				</caps-item-actions>
			</caps-item>
		</caps-item-group>
		<caps-item-group size="lg" label="lg">
			<caps-item>
				<caps-item-media><ng-icon name="lucideInbox" /></caps-item-media>
				<caps-item-content>
					<caps-item-title>Inbox</caps-item-title>
					<caps-item-description>New messages from your team.</caps-item-description>
				</caps-item-content>
				<caps-item-actions>
					<button capsButton type="button" variant="outline" size="sm">Open</button>
				</caps-item-actions>
			</caps-item>
		</caps-item-group>
		<caps-item-group size="xl" label="xl">
			<caps-item>
				<caps-item-media><ng-icon name="lucideInbox" /></caps-item-media>
				<caps-item-content>
					<caps-item-title>Inbox</caps-item-title>
					<caps-item-description>New messages from your team.</caps-item-description>
				</caps-item-content>
				<caps-item-actions>
					<button capsButton type="button" variant="outline" size="sm">Open</button>
				</caps-item-actions>
			</caps-item>
		</caps-item-group>
	`,
})
export class ItemSizePreview {}
