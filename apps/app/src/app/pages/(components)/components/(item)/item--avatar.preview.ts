import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-item-avatar-preview',
	imports: [CapsItemImports, CapsButtonImports, CapsAvatarImports, NgIcon],
	providers: [provideIcons({ lucidePlus })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-lg flex-col gap-6',
	},
	template: `
		<caps-item>
			<caps-item-media>
				<caps-avatar class="size-10">
					<img capsAvatarImage src="https://github.com/evilrabbit.png" alt="Evil Rabbit" />
					<caps-avatar-fallback>ER</caps-avatar-fallback>
				</caps-avatar>
			</caps-item-media>
			<caps-item-content>
				<caps-item-title>Evil Rabbit</caps-item-title>
				<caps-item-description>Last seen 5 months ago</caps-item-description>
			</caps-item-content>
			<caps-item-actions>
				<button capsButton size="icon-sm" variant="outline" class="rounded-full" aria-label="Invite">
					<ng-icon name="lucidePlus" />
				</button>
			</caps-item-actions>
		</caps-item>

		<caps-item>
			<caps-item-media>
				<div
					class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
				>
					<caps-avatar class="hidden sm:flex">
						<img capsAvatarImage src="/assets/capsule.svg" alt="Capsule" />
						<caps-avatar-fallback>CN</caps-avatar-fallback>
					</caps-avatar>
					<caps-avatar class="hidden sm:flex">
						<img capsAvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
						<caps-avatar-fallback>LR</caps-avatar-fallback>
					</caps-avatar>
					<caps-avatar>
						<img capsAvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
						<caps-avatar-fallback>ER</caps-avatar-fallback>
					</caps-avatar>
				</div>
			</caps-item-media>
			<caps-item-content>
				<caps-item-title>No Team Members</caps-item-title>
				<caps-item-description>Invite your team to collaborate on this project.</caps-item-description>
			</caps-item-content>
			<caps-item-actions>
				<button capsButton size="sm" variant="outline">Invite</button>
			</caps-item-actions>
		</caps-item>
	`,
})
export class ItemAvatarPreview {}
