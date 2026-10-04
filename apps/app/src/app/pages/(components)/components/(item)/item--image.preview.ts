import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsItemImports } from '@capsule-ng/caps/item';

@Component({
	selector: 'spartan-item-image-preview',
	imports: [CapsItemImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-md flex-col gap-6',
	},
	template: `
		<caps-item-group>
			@for (song of _songs; track song.title) {
				<caps-item>
					<a capsItem href="#">
						<caps-item-media>
							<img
								[src]="'https://avatar.vercel.sh/' + song.title"
								[alt]="song.title"
								width="32"
								height="32"
								class="object-cover grayscale"
							/>
						</caps-item-media>

						<caps-item-content>
							<caps-item-title class="line-clamp-1">
								{{ song.title }} -
								<span class="text-muted-foreground">{{ song.album }}</span>
							</caps-item-title>
							<caps-item-description>{{ song.artist }}</caps-item-description>
						</caps-item-content>

						<caps-item-content class="flex-none text-center">
							<caps-item-description>{{ song.duration }}</caps-item-description>
						</caps-item-content>
					</a>
				</caps-item>
			}
		</caps-item-group>
	`,
})
export class ItemImagePreview {
	protected readonly _songs = [
		{
			title: 'Midnight City Lights',
			artist: 'Neon Dreams',
			album: 'Electric Nights',
			duration: '3:45',
		},
		{
			title: 'Coffee Shop Conversations',
			artist: 'The Morning Brew',
			album: 'Urban Stories',
			duration: '4:05',
		},
		{
			title: 'Digital Rain',
			artist: 'Cyber Symphony',
			album: 'Binary Beats',
			duration: '3:30',
		},
	];
}
