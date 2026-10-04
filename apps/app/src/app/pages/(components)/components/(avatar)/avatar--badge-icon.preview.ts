import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';

@Component({
	selector: 'spartan-avatar-badge-icon-preview',
	imports: [CapsAvatarImports, NgIcon],
	providers: [provideIcons({ lucidePlus })],

	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-avatar class="grayscale">
			<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" />
			<caps-avatar-fallback>RG</caps-avatar-fallback>
			<caps-avatar-badge>
				<ng-icon name="lucidePlus" />
			</caps-avatar-badge>
		</caps-avatar>
	`,
})
export class AvatarBadgeIconPreview {}
