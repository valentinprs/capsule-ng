import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-item-group-preview',
	imports: [CapsItemImports, CapsAvatarImports, CapsButtonImports, NgIcon],
	providers: [provideIcons({ lucidePlus })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-md flex-col gap-6',
	},
	template: `
		<caps-item-group>
			@for (person of _people; track person.username; let last = $last) {
				<caps-item>
					<caps-item-media>
						<caps-avatar>
							<img capsAvatarImage [src]="person.avatar" alt="" class="grayscale" />
							<caps-avatar-fallback>{{ person.username.charAt(0).toUpperCase() }}</caps-avatar-fallback>
						</caps-avatar>
					</caps-item-media>

					<caps-item-content class="gap-1">
						<caps-item-title>{{ person.username }}</caps-item-title>
						<caps-item-description>{{ person.email }}</caps-item-description>
					</caps-item-content>

					<caps-item-actions>
						<button capsButton variant="ghost" size="icon" class="rounded-full" aria-label="Add person">
							<ng-icon name="lucidePlus" />
						</button>
					</caps-item-actions>
				</caps-item>
			}
		</caps-item-group>
	`,
})
export class ItemGroupPreview {
	protected readonly _people = [
		{
			username: 'spartan-ng',
			avatar: '/assets/capsule.svg',
			email: 'spartan@ng.com',
		},
		{
			username: 'maxleiter',
			avatar: 'https://github.com/maxleiter.png',
			email: 'maxleiter@vercel.com',
		},
		{
			username: 'evilrabbit',
			avatar: 'https://github.com/evilrabbit.png',
			email: 'evilrabbit@vercel.com',
		},
	];
}
``;
