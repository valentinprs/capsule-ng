import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsAvatarImports } from '@capsule-ng/caps/avatar';

@Component({
	selector: 'spartan-avatar-badge-preview',
	imports: [CapsAvatarImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-avatar>
			<img capsAvatarImage src="/assets/avatar.png" alt="@spartan-ui logo" />
			<caps-avatar-fallback>RG</caps-avatar-fallback>
			<caps-avatar-badge class="bg-red-600 dark:bg-red-800" />
		</caps-avatar>
	`,
})
export class AvatarBadgePreview {}
