import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';

@Component({
	selector: 'spartan-avatar-preview',
	imports: [CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="flex flex-row flex-wrap items-center gap-6 md:gap-12">
			<caps-avatar>
				<img
					capsAvatarImage
					src="/assets/avatar.png"
					alt="spartan logo. Resembling a spartanic shield"
					class="grayscale"
				/>
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
			<caps-avatar>
				<img
					capsAvatarImage
					src="/assets/avatar.png"
					alt="spartan logo. Resembling a spartanic shield"
					class="grayscale"
				/>
				<caps-avatar-fallback>RG</caps-avatar-fallback>
				<caps-avatar-badge class="bg-red-600 dark:bg-red-800" />
			</caps-avatar>
			<caps-avatar-group class="grayscale">
				<caps-avatar>
					<img capsAvatarImage src="/assets/avatar.png" alt="spartan logo. Resembling a spartanic shield" />
					<caps-avatar-fallback>RG</caps-avatar-fallback>
				</caps-avatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/avatar.png" alt="spartan logo. Resembling a spartanic shield" />
					<caps-avatar-fallback>RG</caps-avatar-fallback>
				</caps-avatar>
				<caps-avatar>
					<img capsAvatarImage src="/assets/avatar.png" alt="spartan logo. Resembling a spartanic shield" />
					<caps-avatar-fallback>RG</caps-avatar-fallback>
				</caps-avatar>
				<caps-avatar-group-count>+3</caps-avatar-group-count>
			</caps-avatar-group>
		</div>
	`,
})
export class AvatarPreview {}

export const defaultImports = `
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
`;

export const defaultSkeleton = `
<caps-avatar>
   <img capsAvatarImage src='/assets/avatar.png' alt='spartan logo. Resembling a spartanic shield' />
   <caps-avatar-fallback>RG</caps-avatar-fallback>
</caps-avatar>
`;
