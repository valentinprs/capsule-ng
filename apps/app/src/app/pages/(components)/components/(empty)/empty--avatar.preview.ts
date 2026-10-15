import { Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsEmptyImports } from '@capsule-ng/caps/empty';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMessageCircle } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-empty-avatar',
	imports: [NgIcon, CapsButton, CapsEmptyImports, CapsAvatarImports],
	providers: [provideIcons({ lucideMessageCircle })],
	template: `
		<caps-empty>
			<caps-empty-media>
				<caps-avatar class="size-12">
					<img src="/assets/avatar.png" alt="spartan logo. Resembling a spartanic shield" capsAvatarImage />
					<caps-avatar-fallback class="bg-[#D6004C] text-white">RG</caps-avatar-fallback>
				</caps-avatar>
			</caps-empty-media>
			<caps-empty-title>User Offline</caps-empty-title>
			<caps-empty-description>
				This user is currently offline. You can leave a message to notify them or try again later.
			</caps-empty-description>

			<caps-empty-actions>
				<button type="button" capsButton size="sm">
					<ng-icon aria-hidden="true" name="lucideMessageCircle" />
					Leave message
				</button>
			</caps-empty-actions>
		</caps-empty>
	`,
})
export class EmptyAvatar {}
