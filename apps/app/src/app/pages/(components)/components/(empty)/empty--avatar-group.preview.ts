import { Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { CapsButton } from '@capsule-ng/caps/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';

@Component({
	selector: 'spartan-empty-avatar-group',
	imports: [NgIcon, CapsButton, HlmEmptyImports, CapsAvatarImports],
	providers: [provideIcons({ lucidePlus })],
	template: `
		<div hlmEmpty>
			<div hlmEmptyHeader>
				<div hlmEmptyMedia>
					<div
						class="[&>caps-avatar]:ring-background flex -space-x-2 [&>caps-avatar]:size-12 [&>caps-avatar]:ring-2 [&>caps-avatar]:grayscale"
					>
						<caps-avatar class="size-12">
							<img src="https://picsum.photos/1000/800?grayscale&random=1" alt="avatar 1" capsAvatarImage />
							<caps-avatar-fallback class="bg-[#FD005B] text-white">A1</caps-avatar-fallback>
						</caps-avatar>
						<caps-avatar class="size-12">
							<img src="https://picsum.photos/1000/800?grayscale&random=2" alt="avatar 2" capsAvatarImage />
							<caps-avatar-fallback class="bg-[#FD005B] text-white">A2</caps-avatar-fallback>
						</caps-avatar>
						<caps-avatar class="size-12">
							<img src="https://picsum.photos/1000/800?grayscale&random=3" alt="avatar 3" capsAvatarImage />
							<caps-avatar-fallback class="bg-[#FD005B] text-white">A3</caps-avatar-fallback>
						</caps-avatar>
					</div>
				</div>
				<div hlmEmptyTitle>No Team Members</div>
				<div hlmEmptyDescription>Invite your team to collaborate on this project.</div>
			</div>
			<div hlmEmptyContent>
				<button capsButton size="sm">
					<ng-icon name="lucidePlus" />
					Invite Members
				</button>
			</div>
		</div>
	`,
})
export class EmptyAvatarGroup {}
