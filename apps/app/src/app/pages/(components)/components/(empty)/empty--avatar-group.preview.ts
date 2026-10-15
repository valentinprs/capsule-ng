import { Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsEmptyImports } from '@capsule-ng/caps/empty';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-empty-avatar-group',
	imports: [NgIcon, CapsButton, CapsEmptyImports, CapsAvatarImports],
	providers: [provideIcons({ lucidePlus })],
	template: `
		<caps-empty>
			<caps-empty-media>
				<div
					class="[&>caps-avatar]:ring-background flex -space-x-2 rtl:space-x-reverse [&>caps-avatar]:size-12 [&>caps-avatar]:ring-2 [&>caps-avatar]:grayscale"
				>
					<caps-avatar class="size-12">
						<img src="https://picsum.photos/1000/800?grayscale&random=1" alt="avatar 1" capsAvatarImage />
						<caps-avatar-fallback class="bg-[#D6004C] text-white">A1</caps-avatar-fallback>
					</caps-avatar>
					<caps-avatar class="size-12">
						<img src="https://picsum.photos/1000/800?grayscale&random=2" alt="avatar 2" capsAvatarImage />
						<caps-avatar-fallback class="bg-[#D6004C] text-white">A2</caps-avatar-fallback>
					</caps-avatar>
					<caps-avatar class="size-12">
						<img src="https://picsum.photos/1000/800?grayscale&random=3" alt="avatar 3" capsAvatarImage />
						<caps-avatar-fallback class="bg-[#D6004C] text-white">A3</caps-avatar-fallback>
					</caps-avatar>
				</div>
			</caps-empty-media>
			<caps-empty-title>No Team Members</caps-empty-title>
			<caps-empty-description>Invite your team to collaborate on this project.</caps-empty-description>

			<caps-empty-actions>
				<button type="button" capsButton size="sm">
					<ng-icon aria-hidden="true" name="lucidePlus" />
					Invite Members
				</button>
			</caps-empty-actions>
		</caps-empty>
	`,
})
export class EmptyAvatarGroup {}
