import { Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMessageCircle } from '@ng-icons/lucide';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
	selector: 'spartan-empty-avatar',
	imports: [NgIcon, CapsButton, HlmEmptyImports, CapsAvatarImports],
	providers: [provideIcons({ lucideMessageCircle })],
	template: `
		<div hlmEmpty>
			<div hlmEmptyHeader>
				<div hlmEmptyMedia>
					<caps-avatar class="size-12">
						<img src="/assets/avatar.png" alt="spartan logo. Resembling a spartanic shield" capsAvatarImage />
						<caps-avatar-fallback class="bg-[#D6004C] text-white">RG</caps-avatar-fallback>
					</caps-avatar>
				</div>
				<div hlmEmptyTitle>User Offline</div>
				<div hlmEmptyDescription>
					This user is currently offline. You can leave a message to notify them or try again later.
				</div>
			</div>
			<div hlmEmptyContent>
				<button capsButton size="sm">
					<ng-icon name="lucideMessageCircle" />
					Leave message
				</button>
			</div>
		</div>
	`,
})
export class EmptyAvatar {}
