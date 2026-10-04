import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-avatar-group-icon-preview',
	imports: [CapsAvatarImports, NgIcon],
	providers: [provideIcons({ lucidePlus })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-avatar-group class="grayscale">
			<caps-avatar>
				<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" class="grayscale" />
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
			<caps-avatar>
				<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" class="grayscale" />
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
			<caps-avatar>
				<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" class="grayscale" />
				<caps-avatar-fallback>RG</caps-avatar-fallback>
			</caps-avatar>
			<caps-avatar-group-count>
				<ng-icon name="lucidePlus" />
			</caps-avatar-group-count>
		</caps-avatar-group>
	`,
})
export class AvatarGroupIconPreview {}
