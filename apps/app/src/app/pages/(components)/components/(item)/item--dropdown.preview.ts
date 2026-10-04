import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsItemImports } from '@capsule-ng/caps/item';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';

@Component({
	selector: 'spartan-item-dropdown-preview',
	imports: [CapsItemImports, CapsButtonImports, CapsAvatarImports, NgIcon, HlmDropdownMenuImports],
	providers: [provideIcons({ lucideChevronDown })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex min-h-64 w-full max-w-md flex-col items-center gap-6',
	},
	template: `
		<button capsButton variant="outline" [hlmDropdownMenuTrigger]="people" align="end">
			Select
			<ng-icon name="lucideChevronDown" />
		</button>

		<ng-template #people>
			<hlm-dropdown-menu class="w-48">
				@for (person of _people; track person.email) {
					<hlm-dropdown-menu-item class="p-0">
						<caps-item class="w-full p-2">
							<caps-item-media>
								<caps-avatar class="size-6.5">
									<img capsAvatarImage [src]="person.avatar" alt="" class="grayscale" />
									<caps-avatar-fallback>
										{{ person.username.charAt(0).toUpperCase() }}
									</caps-avatar-fallback>
								</caps-avatar>
							</caps-item-media>
							<caps-item-content class="gap-0">
								<caps-item-title>{{ person.username }}</caps-item-title>
								<caps-item-description class="leading-none">{{ person.email }}</caps-item-description>
							</caps-item-content>
						</caps-item>
					</hlm-dropdown-menu-item>
				}
			</hlm-dropdown-menu>
		</ng-template>
	`,
})
export class ItemDropdownPreview {
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
